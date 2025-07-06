import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ProgressFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

// Validation rules for each field
const validationRules = {
  weight: {
    min: 30,
    max: 300,
    message: 'Weight must be between 30kg and 300kg'
  },
  hipSize: {
    min: 50,
    max: 200,
    message: 'Hip size must be between 50cm and 200cm'
  },
  waistSize: {
    min: 40,
    max: 200,
    message: 'Waist size must be between 40cm and 200cm'
  }
};

const MeasurementForm: React.FC<ProgressFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    weight: '',
    hipSize: '',
    waistSize: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateField = (name: keyof typeof validationRules, value: string) => {
    const numValue = parseFloat(value);
    const rules = validationRules[name];
    
    if (isNaN(numValue)) {
      return 'Please enter a valid number';
    }
    
    if (numValue < rules.min || numValue > rules.max) {
      return rules.message;
    }
    
    return '';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Required fields
    if (!formData.weight) {
      newErrors.weight = 'Weight is required';
      isValid = false;
    } else {
      const weightError = validateField('weight', formData.weight);
      if (weightError) {
        newErrors.weight = weightError;
        isValid = false;
      }
    }

    if (!formData.hipSize) {
      newErrors.hipSize = 'Hip size is required';
      isValid = false;
    } else {
      const hipError = validateField('hipSize', formData.hipSize);
      if (hipError) {
        newErrors.hipSize = hipError;
        isValid = false;
      }
    }


    if (formData.waistSize) {
      const waistError = validateField('waistSize', formData.waistSize);
      if (waistError) {
        newErrors.waistSize = waistError;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.post('/api/progress', {
        weight: parseFloat(formData.weight),
        hipSize: parseFloat(formData.hipSize),
        waistSize: formData.waistSize ? parseFloat(formData.waistSize) : undefined,
        date: formData.date,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Submission error:', err);
      // setSubmitError(
      //   err.response?.data?.message || 
      //   'Failed to save progress. Please try again.'
      // );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">Add New Measurement</h2>
      
      {submitError && (
        <div className="bg-red-900/50 text-red-200 p-3 rounded-lg border border-red-700">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full bg-gray-700 border ${errors.date ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
            max={new Date().toISOString().split('T')[0]} // Can't select future dates
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-400">{errors.date}</p>
          )}
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-1">
            Weight (kg) *
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            step="0.1"
            min={validationRules.weight.min}
            max={validationRules.weight.max}
            className={`w-full bg-gray-700 border ${errors.weight ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="72.5"
            required
          />
          {errors.weight && (
            <p className="mt-1 text-sm text-red-400">{errors.weight}</p>
          )}
        </div>

        <div>
          <label htmlFor="hipSize" className="block text-sm font-medium text-gray-300 mb-1">
            Hip Size (cm) *
          </label>
          <input
            type="number"
            id="hipSize"
            name="hipSize"
            value={formData.hipSize}
            onChange={handleChange}
            step="0.1"
            min={validationRules.hipSize.min}
            max={validationRules.hipSize.max}
            className={`w-full bg-gray-700 border ${errors.hipSize ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="95.0"
            required
          />
          {errors.hipSize && (
            <p className="mt-1 text-sm text-red-400">{errors.hipSize}</p>
          )}
        </div>

        <div>
          <label htmlFor="waistSize" className="block text-sm font-medium text-gray-300 mb-1">
            Waist Size (cm)
          </label>
          <input
            type="number"
            id="waistSize"
            name="waistSize"
            value={formData.waistSize}
            onChange={handleChange}
            step="0.1"
            min={validationRules.waistSize.min}
            max={validationRules.waistSize.max}
            className={`w-full bg-gray-700 border ${errors.waistSize ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="80.0"
          />
          {errors.waistSize && (
            <p className="mt-1 text-sm text-red-400">{errors.waistSize}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700/50 transition"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : 'Save Measurement'}
        </button>
      </div>
    </form>
  );
};

export default MeasurementForm;