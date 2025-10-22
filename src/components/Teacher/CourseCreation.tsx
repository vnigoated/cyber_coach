import React, { useState, useEffect } from 'react';
import { courseService } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';

interface ModuleInput {
  title: string;
  description: string;
  content: string;
}

type FormStep = 'details' | 'modules';

import { Course } from '../../types';

interface CourseCreationProps {
  onSuccess?: (course: Course) => void;
  onCancel?: () => void;
  course?: Course | null;
}

const CourseCreation: React.FC<CourseCreationProps> = ({ onSuccess, onCancel, course }) => {
  const { user } = useAuth();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<FormStep>('details');
  
  // Course form state
  const [courseData, setCourseData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    category: course?.category || '',
    difficulty: (course?.difficulty || 'beginner') as 'beginner' | 'intermediate' | 'advanced',
    estimated_hours: course?.estimated_hours || 0
  });

  // Modules state
  // Load existing modules if editing
  const [modules, setModules] = useState<ModuleInput[]>([]);

  useEffect(() => {
    if (course) {
      // Load existing modules when editing
      courseService.getModulesByCourse(course.id)
        .then(existingModules => {
          setModules(existingModules.length > 0 ? existingModules : [{ title: '', description: '', content: '' }]);
        })
        .catch(console.error);
    } else {
      // Initialize with one empty module for new courses
      setModules([{ title: '', description: '', content: '' }]);
    }
  }, [course]);

  const handleCourseInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: name === 'estimated_hours' ? Number(value) : value
    }));
  };

  const handleModuleChange = (index: number, field: keyof ModuleInput, value: string) => {
    setModules(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addModule = () => {
    if (modules.length >= 10) {
      setError('Maximum limit of 10 modules reached');
      return;
    }
    setModules(prev => [...prev, { title: '', description: '', content: '' }]);
  };

  const removeModule = (index: number) => {
    setModules(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate current step
    if (currentStep === 'details') {
      if (!courseData.title || !courseData.description || !courseData.category) {
        setError('Please fill in all required course details');
        return;
      }
      // Move to modules step
      setCurrentStep('modules');
      return;
    }

    // If we're on the modules step, proceed with course creation
    setIsLoading(true);

    try {
      // Validate at least one module
      if (modules.length === 0) {
        throw new Error('Please add at least one module');
      }

      // Validate required module fields
      const invalidModule = modules.find(m => !m.title || !m.description || !m.content);
      if (invalidModule) {
        throw new Error('Please fill in all module fields');
      }

      let savedCourse: Course;

      if (course) {
        // Update existing course
        savedCourse = await courseService.updateCourse(course.id, {
          ...courseData,
          teacher_id: user?.id
        });

        // Update existing modules and create new ones
          await Promise.all(modules.map((module, index) => {
          // If it's an existing module, update it
          if ((module as any).id) {
            return courseService.updateModule((module as any).id, {
              ...module,
              module_order: index + 1
            });
          }
          // Otherwise create a new module
          return courseService.createModule({
            ...module,
            course_id: course.id,
              module_order: index + 1
          });
        }));
      } else {
        // Create new course
        savedCourse = await courseService.createCourse({
          ...courseData,
          teacher_id: user?.id,
          is_published: false
        });

        // Create new modules
        await Promise.all(modules.map((module, index) => 
          courseService.createModule({
            ...module,
            course_id: savedCourse.id,
            module_order: index + 1
          })
        ));
      }

      // Clear form
      setCourseData({
        title: '',
        description: '',
        category: '',
        difficulty: 'beginner',
        estimated_hours: 0
      });
      setModules([{ title: '', description: '', content: '' }]);
      setCurrentStep('details');

      onSuccess?.(savedCourse);
    } catch (err: any) {
      setError(err.message || 'Failed to create course');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setError('');
    setCurrentStep('details');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Create New Course</h2>
          <button
            onClick={onCancel}
            className="text-slate-300 hover:text-white transition-colors text-lg font-medium"
          >
            ✕
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-6 bg-slate-900/50 rounded-lg p-4">
          <div className="flex items-center flex-1">
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
              currentStep === 'details' ? 'bg-emerald-500 text-white' : 'bg-emerald-500/20 text-emerald-500'
            }`}>
              1
            </div>
            <div className="ml-3">
              <div className={`font-medium ${currentStep === 'details' ? 'text-white' : 'text-emerald-500'}`}>Course Details</div>
            </div>
          </div>
          <div className="w-12 h-0.5 bg-slate-700"></div>
          <div className="flex items-center flex-1">
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
              currentStep === 'modules' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'
            }`}>
              2
            </div>
            <div className="ml-3">
              <div className={`font-medium ${currentStep === 'modules' ? 'text-white' : 'text-slate-400'}`}>Course Modules</div>
            </div>
          </div>
        </div>
      
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 'details' ? (
            <div className="bg-slate-900/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Course Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={courseData.title}
                    onChange={handleCourseInputChange}
                    className="mt-1 block w-full rounded-md bg-slate-800 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={courseData.description}
                    onChange={handleCourseInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md bg-slate-800 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={courseData.category}
                      onChange={handleCourseInputChange}
                      className="mt-1 block w-full rounded-md bg-slate-800 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300">
                      Difficulty
                    </label>
                    <select
                      name="difficulty"
                      value={courseData.difficulty}
                      onChange={handleCourseInputChange}
                      className="mt-1 block w-full rounded-md bg-slate-800 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300">
                      Estimated Hours
                    </label>
                    <input
                      type="number"
                      name="estimated_hours"
                      value={courseData.estimated_hours}
                      onChange={handleCourseInputChange}
                      min="0"
                      className="mt-1 block w-full rounded-md bg-slate-800 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Course Modules ({modules.length}/10)
                </h3>
                <button
                  type="button"
                  onClick={addModule}
                  disabled={modules.length >= 10}
                  className="px-4 py-2.5 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Module
                </button>
              </div>

              <div className="space-y-6">
                {modules.map((module, index) => (
                  <div key={index} className="p-4 border border-slate-700 rounded-lg bg-slate-800/50 relative">
                    <div className="absolute top-4 right-4">
                      {modules.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeModule(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <h4 className="text-md font-medium text-white mb-4">
                      Module {index + 1}
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300">
                          Title
                        </label>
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                          className="mt-1 block w-full rounded-md bg-slate-800 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300">
                          Description
                        </label>
                        <textarea
                          value={module.description}
                          onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
                          rows={2}
                          className="mt-1 block w-full rounded-md bg-slate-800 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300">
                          Content
                        </label>
                        <textarea
                          value={module.content}
                          onChange={(e) => handleModuleChange(index, 'content', e.target.value)}
                          rows={4}
                          className="mt-1 block w-full rounded-md bg-slate-800 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end items-center gap-3 mt-6">
            {/* Left side buttons */}
            <div className="flex-1 flex gap-3">
              {currentStep === 'modules' && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2.5 bg-transparent text-white border border-slate-600 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                  Back
                </button>
              )}
            </div>

            {/* Right side buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2.5 bg-transparent text-white border border-slate-600 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-3 text-white rounded-md font-semibold text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 ${
                  currentStep === 'details'
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:ring-emerald-500 shadow-lg shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500 shadow-lg shadow-blue-500/20'
                }`}
              >
                {isLoading ? (
                  'Creating Course...'
                ) : currentStep === 'details' ? (
                  <span className="flex items-center gap-2">
                    Next Step
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                ) : (
                  'Create Course'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CourseCreation };