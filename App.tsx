import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup, PanInfo } from 'framer-motion';
import { 
  Plus, ArrowLeft, MoreVertical, 
  Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight,
  FolderPlus, FilePlus, Settings, Trash2, X, Palette,
  Sun, Moon, CornerDownLeft, Folder as FolderIcon,
  CheckCircle2, Check, Minimize2, Maximize2, AlertTriangle,
  Search, Heart, Menu, Download, Upload, Save
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Note, Folder, Shape, ColorTheme } from './types';
import { DARK_COLORS, LIGHT_COLORS, SHAPES, ICONS } from './constants';

// --- Custom Hooks ---

const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const useLongPress = (callback: () => void, ms = 500) => {
  const [startLongPress, setStartLongPress] = useState(false);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    if (startLongPress) {
      timerId = setTimeout(() => {
        callbackRef.current();
        setStartLongPress(false);
      }, ms);
    }
    return () => clearTimeout(timerId);
  }, [ms, startLongPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
    onTouchMove: () => setStartLongPress(false),
  };
};

// --- Components ---

const IconButton = ({ onClick, icon: Icon, className = "", active = false, activeClass = "bg-zinc-800 text-white" }: any) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-full transition-transform active:scale-90 flex items-center justify-center ${active ? activeClass : 'hover:bg-black/5 text-inherit'} ${className}`}
  >
    <Icon size={24} />
  </button>
);

// --- Sidebar Drawer ---

const Sidebar = ({ isOpen, onClose, isDark, toggleTheme, onExport, onImport }: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 left-0 bottom-0 w-80 z-50 p-6 shadow-2xl overflow-y-auto ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Dinduy</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-black/10">
                <X size={24} />
              </button>
            </div>

            {/* Developer Info */}
            <div className={`p-5 rounded-2xl mb-6 border ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
               <h3 className="text-xs uppercase font-bold opacity-50 mb-3">Developer</h3>
               <div className="font-bold text-lg">Ilham Danial Saputra</div>
               <div className="opacity-70 text-sm mb-4">Mahasiswa Pendidikan Sejarah</div>
               <a 
                 href="https://saweria.co/Densl" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-full py-3 rounded-xl font-medium bg-[#fab005] text-black hover:bg-[#e09e04] transition-colors flex items-center justify-center gap-2"
               >
                 <Heart size={18} fill="black" /> Donate (Saweria)
               </a>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs uppercase font-bold opacity-50 tracking-wider">Settings</h3>
              
              <button 
                onClick={toggleTheme}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-colors border ${isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border-zinc-200 hover:bg-zinc-50'}`}
              >
                {isDark ? <Sun className="text-yellow-400" /> : <Moon className="text-indigo-600" />}
                <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              <button 
                onClick={onExport}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-colors border ${isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border-zinc-200 hover:bg-zinc-50'}`}
              >
                <Download size={20} />
                <span className="font-medium">Backup Data (JSON)</span>
              </button>

              <button 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-colors border ${isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border-zinc-200 hover:bg-zinc-50'}`}
              >
                <Upload size={20} />
                <span className="font-medium">Import Data</span>
                <input 
                  type="file" 
                  accept=".json" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={onImport}
                />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [isDark, setIsDark] = useLocalStorage<boolean>('desnote-theme', false);
  
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const [notes, setNotes] = useLocalStorage<Note[]>('desnote-notes', []);
  const [folders, setFolders] = useLocalStorage<Folder[]>('desnote-folders', [
    { id: '1', name: 'Personal', color: 'rose', shape: 'rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl' },
    { id: '2', name: 'Work', color: 'blue', shape: 'rounded-tr-[4rem] rounded-bl-[4rem] rounded-tl-xl rounded-br-xl' }
  ]);
  
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [expandedFolderId, setExpandedFolderId] = useState<string | null>(null);
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  
  // Smart Search
  const [searchQuery, setSearchQuery] = useState('');

  // Selection Mode
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showMoveDialog, setShowMoveDialog] = useState(false);

  const activeNote = notes.find(n => n.id === activeNoteId);

  // Filter Logic
  const filteredNotes = searchQuery 
    ? notes.filter(n => 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        n.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // --- Actions ---

  const handleExport = () => {
    const data = JSON.stringify({ notes, folders }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dinduy-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.notes && data.folders) {
          setNotes(data.notes);
          setFolders(data.folders);
          alert('Data imported successfully!');
          setShowSidebar(false);
        }
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const createNote = (folderId: string | null = null) => {
    const newNote: Note = {
      id: uuidv4(),
      title: '',
      content: '',
      folderId,
      color: 'slate',
      shape: 'rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl',
      icon: 'file-text',
      updatedAt: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setShowNewMenu(false);
    setSearchQuery('');
  };

  const createFolder = () => {
    const newFolder: Folder = {
      id: uuidv4(),
      name: 'New Folder',
      color: 'violet',
      shape: 'rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl',
    };
    setFolders([...folders, newFolder]);
    setShowNewMenu(false);
    setSearchQuery('');
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (activeNoteId === id) setActiveNoteId(null);
  };

  const deleteFolder = (id: string) => {
    setNotes(prev => prev.map(n => n.folderId === id ? { ...n, folderId: null } : n));
    setFolders(prev => prev.filter(f => f.id !== id));
    if (expandedFolderId === id) setExpandedFolderId(null);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#121212] text-[#f0f0f0]' : 'bg-[#fdfdfd] text-[#1a1c1e]'}`}>
      <Sidebar 
        isOpen={showSidebar} 
        onClose={() => setShowSidebar(false)} 
        isDark={isDark} 
        toggleTheme={() => setIsDark(!isDark)}
        onExport={handleExport}
        onImport={handleImport}
      />

      <AnimatePresence mode="wait">
        {activeNoteId ? (
          <NoteEditor 
            key="editor"
            note={activeNote!}
            folders={folders}
            isDark={isDark}
            onUpdate={(id: string, u: Partial<Note>) => setNotes(prev => prev.map(n => n.id === id ? {...n, ...u, updatedAt: Date.now()} : n))}
            onClose={() => setActiveNoteId(null)}
            onDelete={() => deleteNote(activeNoteId)}
            onMoveNote={(nId: string, fId: string | null) => setNotes(prev => prev.map(n => n.id === nId ? {...n, folderId: fId} : n))}
          />
        ) : (
          <Dashboard 
            key="dashboard"
            notes={notes}
            folders={folders}
            isDark={isDark}
            toggleSidebar={() => setShowSidebar(true)}
            expandedFolderId={expandedFolderId}
            setExpandedFolderId={setExpandedFolderId}
            onOpenNote={setActiveNoteId}
            onUpdateFolder={(id, u) => setFolders(prev => prev.map(f => f.id === id ? {...f, ...u} : f))}
            onDeleteFolder={deleteFolder}
            onDeleteNote={deleteNote}
            onCreateNoteInFolder={createNote}
            
            isSelectionMode={isSelectionMode}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            setIsSelectionMode={setIsSelectionMode}
            
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredNotes={filteredNotes}
            
            moveSelected={(targetId: string | null) => {
                setNotes(prev => prev.map(n => selectedIds.has(n.id) ? { ...n, folderId: targetId } : n));
                setIsSelectionMode(false);
                setSelectedIds(new Set());
            }}
            deleteSelected={() => {
                setNotes(prev => prev.filter(n => !selectedIds.has(n.id)));
                setFolders(prev => prev.filter(f => !selectedIds.has(f.id)));
                setIsSelectionMode(false);
                setSelectedIds(new Set());
            }}
          />
        )}
      </AnimatePresence>

      {!activeNoteId && !isSelectionMode && !searchQuery && (
        <div className="fixed bottom-6 right-6 z-40">
           <AnimatePresence>
            {showNewMenu && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute bottom-20 right-0 flex flex-col gap-3 items-end mb-2"
              >
                <button onClick={() => createFolder()} className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border ${isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-zinc-200 text-zinc-800'}`}>
                  <span className="font-medium">New Folder</span><FolderPlus size={20} />
                </button>
                <button onClick={() => createNote()} className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border ${isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-zinc-200 text-zinc-800'}`}>
                  <span className="font-medium">New Note</span><FilePlus size={20} />
                </button>
              </motion.div>
            )}
           </AnimatePresence>
           <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowNewMenu(!showNewMenu)}
            className={`w-16 h-16 rounded-[1.2rem] shadow-xl flex items-center justify-center border-2 ${isDark ? 'bg-emerald-800 border-emerald-700 text-white' : 'bg-zinc-900 border-zinc-900 text-white'}`}
          >
            <motion.div animate={{ rotate: showNewMenu ? 45 : 0 }}><Plus size={32} /></motion.div>
          </motion.button>
        </div>
      )}
    </div>
  );
}

// --- Dashboard ---

const Dashboard = ({ 
  notes, folders, isDark, toggleSidebar, expandedFolderId, setExpandedFolderId, 
  onOpenNote, onUpdateFolder, onDeleteFolder, onDeleteNote, onCreateNoteInFolder,
  isSelectionMode, selectedIds, setSelectedIds, setIsSelectionMode,
  searchQuery, setSearchQuery, filteredNotes, moveSelected, deleteSelected
}: any) => {
  const rootNotes = notes.filter((n: Note) => n.folderId === null);
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;
  const [showMoveDialog, setShowMoveDialog] = useState(false);

  const toggleSelection = (id: string) => {
     const newSet = new Set(selectedIds);
     if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
     setSelectedIds(newSet);
  };

  return (
    <div className="pb-32 px-4 pt-6 md:px-8 max-w-7xl mx-auto min-h-screen" onClick={() => { setExpandedFolderId(null); if (isSelectionMode) setIsSelectionMode(false); }}>
      {/* Header */}
      <header className="mb-8 flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
         <button onClick={toggleSidebar} className={`p-3 rounded-xl transition-colors ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-white hover:bg-zinc-100 border border-zinc-200'}`}>
            <Menu size={24} />
         </button>
         <div className={`flex-1 relative rounded-2xl flex items-center px-4 py-3 border-2 transition-colors ${isDark ? 'bg-zinc-900 border-zinc-700 focus-within:border-zinc-500' : 'bg-white border-zinc-200 focus-within:border-zinc-400'}`}>
            <Search size={20} className="opacity-50 mr-3" />
            <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="bg-transparent outline-none w-full placeholder-current/50 font-medium"
            />
            {searchQuery && <button onClick={() => setSearchQuery('')}><X size={16} /></button>}
         </div>
      </header>

      {/* Grid */}
      <LayoutGroup>
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
           {searchQuery ? filteredNotes.map((note: Note) => (
               <NoteCard key={note.id} note={note} isDark={isDark} colors={colors} onClick={() => onOpenNote(note.id)} onDelete={() => onDeleteNote(note.id)} />
           )) : (
             <>
               {folders.map((folder: Folder) => (
                  <FolderItem 
                    key={folder.id} 
                    folder={folder} 
                    notes={notes.filter((n: Note) => n.folderId === folder.id)}
                    isExpanded={expandedFolderId === folder.id}
                    isDark={isDark}
                    colors={colors}
                    onToggle={() => setExpandedFolderId(folder.id)}
                    onClose={() => setExpandedFolderId(null)}
                    onOpenNote={onOpenNote}
                    onDelete={() => onDeleteFolder(folder.id)}
                    onUpdate={onUpdateFolder}
                    onCreateNote={() => onCreateNoteInFolder(folder.id)}
                    isSelectionMode={isSelectionMode}
                    isSelected={selectedIds.has(folder.id)}
                    onSelect={() => toggleSelection(folder.id)}
                    onEnterSelect={() => { setIsSelectionMode(true); setSelectedIds(new Set([folder.id])); }}
                    onDeleteNote={onDeleteNote}
                  />
               ))}
               {rootNotes.map((note: Note) => (
                  <NoteCard 
                    key={note.id} 
                    note={note} 
                    isDark={isDark} 
                    colors={colors} 
                    onClick={() => isSelectionMode ? toggleSelection(note.id) : onOpenNote(note.id)} 
                    onDelete={() => onDeleteNote(note.id)}
                    isSelected={selectedIds.has(note.id)}
                    isSelectionMode={isSelectionMode}
                    onLongPress={() => { setIsSelectionMode(true); setSelectedIds(new Set([note.id])); }}
                  />
               ))}
             </>
           )}
        </motion.div>
      </LayoutGroup>

      {/* Selection UI */}
      <AnimatePresence>
        {isSelectionMode && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 left-0 right-0 p-4 z-50 flex justify-center pb-8">
             <div className={`flex gap-4 px-6 py-3 rounded-full shadow-2xl border-2 ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-100'}`}>
                <div className="flex items-center gap-3 mr-4 border-r pr-4 border-gray-500/20">
                   <span className="font-bold text-lg">{selectedIds.size}</span>
                </div>
                <button onClick={() => setShowMoveDialog(true)} className="p-2 rounded-full hover:bg-black/5"><FolderIcon size={24} /></button>
                <button onClick={deleteSelected} className="p-2 rounded-full hover:bg-red-500/10 text-red-500"><Trash2 size={24} /></button>
                <button onClick={() => setIsSelectionMode(false)} className="p-2 rounded-full hover:bg-black/5 ml-2"><X size={24} /></button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Move Dialog */}
      {showMoveDialog && (
         <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80">
            <div className={`w-full max-w-sm rounded-3xl p-6 ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-black'}`}>
               <h3 className="text-xl font-bold mb-4">Move to...</h3>
               <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
                  <button onClick={() => { moveSelected(null); setShowMoveDialog(false); }} className="p-4 rounded-xl hover:bg-black/5 text-left font-medium">Dashboard</button>
                  {folders.map((f: Folder) => (
                     <button key={f.id} onClick={() => { moveSelected(f.id); setShowMoveDialog(false); }} className="p-4 rounded-xl hover:bg-black/5 text-left font-medium">{f.name}</button>
                  ))}
               </div>
               <button onClick={() => setShowMoveDialog(false)} className="mt-4 w-full py-3 opacity-60">Cancel</button>
            </div>
         </div>
      )}
    </div>
  );
};

// --- Folder Item ---

const FolderItem = ({ 
  folder, notes, isExpanded, isDark, colors, onToggle, onClose,
  onOpenNote, onDelete, onUpdate, onCreateNote,
  isSelectionMode, isSelected, onSelect, onEnterSelect, onDeleteNote
}: any) => {
  const themeClass = colors[folder.color] || colors.slate;
  const [editing, setEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const lp = useLongPress(() => { if(!isSelectionMode) onEnterSelect(); });

  const handleDragEnd = (event: any, info: PanInfo) => {
     if (info.offset.x < -100 && !isSelectionMode) onDelete();
  };

  return (
    <motion.div 
       layout 
       className={`${isExpanded ? 'col-span-full' : 'col-span-1 aspect-square'}`}
       onClick={(e) => { e.stopPropagation(); if (isSelectionMode) onSelect(); else isExpanded ? onClose() : onToggle(); }}
       {...lp}
    >
       <div className={`relative w-full h-full rounded-3xl`}>
          {/* Swipe Delete Background */}
          {!isExpanded && !isSelectionMode && (
             <div className="absolute inset-0 bg-red-500 rounded-[2rem] flex items-center justify-end px-6 z-0">
                <Trash2 className="text-white" />
             </div>
          )}

          <motion.div
             drag={!isExpanded && !isSelectionMode ? "x" : false}
             dragConstraints={{ left: 0, right: 0 }}
             dragElastic={{ left: 0.5, right: 0.1 }}
             onDragEnd={handleDragEnd}
             className={`${themeClass} border-2 ${folder.shape} relative z-10 w-full h-full ${isSelected ? 'ring-4 ring-indigo-500 ring-offset-2 ring-offset-transparent' : ''}`}
          >
             <div className="p-6 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                   {editing ? (
                      <input 
                        ref={inputRef} 
                        defaultValue={folder.name} 
                        className="bg-transparent font-bold text-2xl outline-none border-b border-current w-full"
                        onClick={e => e.stopPropagation()}
                        onBlur={(e) => { setEditing(false); onUpdate(folder.id, { name: e.target.value }); }}
                        autoFocus
                      />
                   ) : (
                      <h2 className="text-2xl font-bold truncate pr-2" onDoubleClick={() => setEditing(true)}>{folder.name}</h2>
                   )}
                   {isExpanded && !isSelectionMode && (
                      <div className="relative">
                         <IconButton icon={Palette} onClick={(e: any) => { e.stopPropagation(); setShowSettings(!showSettings); }} />
                         {showSettings && (
                             <div className={`absolute top-12 right-0 w-64 p-4 rounded-2xl shadow-xl z-50 border-2 ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-200'}`} onClick={e => e.stopPropagation()}>
                                 <div className="flex flex-wrap gap-2 mb-4">
                                     {Object.keys(colors).map(c => <button key={c} onClick={() => onUpdate(folder.id, {color: c})} className={`w-6 h-6 rounded-full bg-${c}-400 border border-black/10`} />)}
                                 </div>
                                 <div className="grid grid-cols-3 gap-2">
                                     {SHAPES.slice(0, 9).map((s,i) => <button key={i} onClick={() => onUpdate(folder.id, {shape: s})} className={`h-8 bg-current opacity-20 ${s}`} />)}
                                 </div>
                             </div>
                         )}
                      </div>
                   )}
                </div>
                <div className="text-sm opacity-60 font-medium">{notes.length} Notes</div>
             </div>
          </motion.div>
       </div>

       {/* Inline Expansion Content */}
       <AnimatePresence>
          {isExpanded && (
             <motion.div 
               initial={{ opacity: 0, height: 0 }} 
               animate={{ opacity: 1, height: 'auto' }} 
               exit={{ opacity: 0, height: 0 }}
               className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-4"
             >
                {notes.map((note: Note) => (
                   <NoteCard 
                      key={note.id} 
                      note={note} 
                      isDark={isDark} 
                      colors={colors} 
                      inFolder 
                      onClick={() => onOpenNote(note.id)} 
                      onDelete={() => onDeleteNote(note.id)}
                   />
                ))}
                <button onClick={(e) => { e.stopPropagation(); onCreateNote(); }} className={`border-2 border-dashed rounded-3xl aspect-square flex flex-col items-center justify-center opacity-50 hover:opacity-100 ${isDark ? 'border-zinc-700' : 'border-zinc-300'}`}>
                   <Plus size={32} />
                </button>
             </motion.div>
          )}
       </AnimatePresence>
    </motion.div>
  );
};

// --- Note Card ---

const NoteCard = ({ note, onClick, onDelete, inFolder, isDark, colors, isSelected, isSelectionMode, onLongPress }: any) => {
  const Icon = ICONS[note.icon] || ICONS['file-text'];
  // FIX: Ensure solid color usage even in folder
  const themeClass = colors[note.color] || colors.slate;
  const [isPeeking, setIsPeeking] = useState(false);
  
  const lp = useLongPress(() => { if(onLongPress) onLongPress(); });

  const handleDragEnd = (event: any, info: PanInfo) => {
     // Trigger delete if swiped far left
     if (info.offset.x < -100 && !isSelectionMode) onDelete();
  };

  const previewText = note.content.replace(/<[^>]+>/g, ' ').trim() || "No content";

  return (
    <motion.div 
       layout 
       className={`${isPeeking ? 'col-span-2 row-span-2 z-30' : 'col-span-1 aspect-square'} relative`}
       onClick={(e) => { e.stopPropagation(); onClick(); }}
       {...lp}
    >
        <div className="relative w-full h-full">
            {/* Swipe Delete Background (Red Layer) */}
            {!isPeeking && !isSelectionMode && (
                <div className="absolute inset-0 bg-red-500 rounded-[2rem] flex items-center justify-end px-6 z-0">
                    <Trash2 className="text-white" />
                </div>
            )}

            <motion.div
               drag={!isPeeking && !isSelectionMode ? "x" : false}
               dragConstraints={{ left: 0, right: 0 }}
               dragElastic={{ left: 0.5, right: 0.1 }}
               onDragEnd={handleDragEnd}
               layoutId={`note-${note.id}`}
               className={`
                  w-full h-full relative z-10 border-2 cursor-pointer group overflow-hidden
                  ${themeClass} ${note.shape}
                  ${isSelected ? 'ring-4 ring-indigo-500 ring-offset-2 ring-offset-transparent' : ''}
                  ${isPeeking ? 'shadow-2xl' : ''}
               `}
            >
               <div className="p-6 h-full flex flex-col relative">
                   {/* Peeking Logic: Hide Icons, Show Text */}
                   {isPeeking ? (
                       <div className="flex flex-col h-full overflow-hidden">
                           <h3 className="text-3xl font-bold mb-4 leading-tight">{note.title || "Untitled"}</h3>
                           <div className="text-lg opacity-80 leading-relaxed overflow-hidden max-h-[300px]">
                               {previewText}
                           </div>
                       </div>
                   ) : (
                       <>
                          <h3 className="text-xl font-bold leading-tight line-clamp-3 relative z-10">{note.title || "Untitled"}</h3>
                          <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
                              <Icon size={80} />
                          </div>
                       </>
                   )}

                   {/* Peek Toggle */}
                   {!isSelectionMode && (
                       <button 
                         onClick={(e) => { e.stopPropagation(); setIsPeeking(!isPeeking); }}
                         className={`absolute bottom-3 right-3 p-2 rounded-full border shadow-sm z-20 transition-transform active:scale-90 ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200'}`}
                       >
                          {isPeeking ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}
                       </button>
                   )}

                   {isSelected && <div className="absolute top-4 right-4 bg-indigo-600 text-white p-1 rounded-full"><Check size={16}/></div>}
               </div>
            </motion.div>
        </div>
    </motion.div>
  );
};

// --- Note Editor ---

const NoteEditor = ({ note, onUpdate, onClose, onDelete, onMoveNote, folders, isDark }: any) => {
  const [showSettings, setShowSettings] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;
  const themeClass = colors[note.color] || colors.slate;

  const format = (cmd: string, val?: string) => { document.execCommand(cmd, false, val); };

  return (
    <motion.div layoutId={`note-${note.id}`} className={`fixed inset-0 z-50 flex flex-col ${isDark ? 'bg-[#121212]' : 'bg-[#fdfcf4]'} md:p-6`}>
       <motion.div className={`flex-1 flex flex-col w-full max-w-4xl mx-auto md:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 ${themeClass} ${isDark ? 'md:border-zinc-700' : 'md:border-zinc-200'}`}>
          {/* Toolbar */}
          <div className={`flex justify-between items-center p-4 border-b border-black/5 ${isDark ? 'bg-[#121212]' : 'bg-white'}`}>
             <button onClick={onClose} className={`p-3 rounded-full ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}><ArrowLeft/></button>
             <div className="flex gap-2 relative">
                <IconButton icon={Palette} onClick={() => setShowSettings(!showSettings)} />
                <IconButton icon={Trash2} onClick={onDelete} className="text-red-500 hover:bg-red-500/10" />
                
                {/* Settings Popover */}
                {showSettings && (
                   <div className={`absolute top-14 right-0 w-80 max-h-96 overflow-y-auto p-4 rounded-3xl shadow-xl z-50 border-2 ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-200'}`}>
                      <div className="mb-4">
                         <h4 className="text-xs font-bold opacity-50 mb-2 uppercase">Color</h4>
                         <div className="flex flex-wrap gap-2">{Object.keys(colors).map(c => <button key={c} onClick={() => onUpdate(note.id, {color: c})} className={`w-8 h-8 rounded-full bg-${c}-400 border border-black/10`} />)}</div>
                      </div>
                      <div className="mb-4">
                         <h4 className="text-xs font-bold opacity-50 mb-2 uppercase">Icon</h4>
                         <div className="grid grid-cols-6 gap-1">{Object.keys(ICONS).map(k => { const I=ICONS[k]; return <button key={k} onClick={() => onUpdate(note.id, {icon: k})} className="p-2 hover:bg-black/5 rounded"><I size={16}/></button> })}</div>
                      </div>
                      <div>
                         <h4 className="text-xs font-bold opacity-50 mb-2 uppercase">Move</h4>
                         <button onClick={() => onMoveNote(note.id, null)} className="w-full text-left p-2 hover:bg-black/5 rounded text-sm mb-1">Dashboard</button>
                         {folders.map((f: Folder) => <button key={f.id} onClick={() => onMoveNote(note.id, f.id)} className="w-full text-left p-2 hover:bg-black/5 rounded text-sm flex gap-2"><FolderIcon size={14}/> {f.name}</button>)}
                      </div>
                   </div>
                )}
             </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
             <input value={note.title} onChange={(e) => onUpdate(note.id, {title: e.target.value})} placeholder="Title" className="w-full bg-transparent text-4xl font-bold outline-none mb-6 placeholder-current/30" />
             <div 
               ref={editorRef}
               contentEditable 
               suppressContentEditableWarning
               onInput={(e) => onUpdate(note.id, {content: e.currentTarget.innerHTML})}
               className="outline-none text-xl leading-relaxed min-h-[50vh] empty:before:content-['Type_something...'] empty:before:opacity-50"
               dangerouslySetInnerHTML={{__html: note.content}}
             />
          </div>

          {/* Formatting Bar */}
          <div className={`p-3 flex gap-1 justify-center border-t border-black/5 ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
             <IconButton icon={Bold} onClick={() => format('bold')} />
             <IconButton icon={Italic} onClick={() => format('italic')} />
             <IconButton icon={List} onClick={() => format('insertUnorderedList')} />
             <div className="w-px h-6 bg-current opacity-20 mx-2 self-center"/>
             <button onMouseDown={(e) => {e.preventDefault(); format('formatBlock', 'H2')}} className="px-3 font-bold hover:bg-black/5 rounded-lg">H1</button>
          </div>
       </motion.div>
    </motion.div>
  );
};