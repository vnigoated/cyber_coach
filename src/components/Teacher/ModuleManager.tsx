import React, { useState, useEffect } from 'react';
import { Module } from '../../types';
import { courseService } from '../../services/courseService';

interface ModuleManagerProps {
  courseId: string;
}

export const ModuleManager: React.FC<ModuleManagerProps> = ({ courseId }) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [error, setError] = useState<string>('');
  const [newModule, setNewModule] = useState({
    title: '',
    description: '',
    content: ''
  });

  useEffect(() => {
    loadModules();
  }, [courseId]);

  const loadModules = async () => {
    try {
      const moduleData = await courseService.getModulesByCourse(courseId);
      setModules(moduleData);
    } catch (err) {
      setError('Failed to load modules');
    }
  };

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (modules.length >= 10) {
        setError('Maximum limit of 10 modules reached');
        return;
      }

      await courseService.createModule({
        ...newModule,
        course_id: courseId
      });

      setNewModule({ title: '', description: '', content: '' });
      loadModules();
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Course Modules ({modules.length}/10)
        </h3>
      </div>
      
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Module List */}
      <div className="space-y-3">
        {modules.map((module, index) => (
          <div 
            key={module.id} 
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-gray-500">#{index + 1}</span>
                <h4 className="font-medium text-gray-900">{module.title}</h4>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{module.description}</p>
          </div>
        ))}
      </div>

      {/* Add Module Form */}
      {modules.length < 10 && (
        <form onSubmit={handleAddModule} className="space-y-4 border-t pt-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Module Title
            </label>
            <input
              type="text"
              value={newModule.title}
              onChange={(e) => setNewModule({...newModule, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newModule.description}
              onChange={(e) => setNewModule({...newModule, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={newModule.content}
              onChange={(e) => setNewModule({...newModule, content: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={5}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Module
          </button>
        </form>
      )}
    </div>
  );
};

export default ModuleManager;