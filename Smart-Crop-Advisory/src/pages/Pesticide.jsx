import { useState } from 'react';
import { Calculator, Shield, AlertTriangle, Bug, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

export const Pesticide = () => {
  const t = useTranslation();
  const [crop, setCrop] = useState('');
  const [land, setLand] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculatePesticide = (e) => {
    e.preventDefault();
    if (!crop) {
      setError(t.selectCrop || 'Please select a crop');
      setResult(null);
      return;
    }
    if (!land || isNaN(land) || land <= 0) {
      setError('Please enter a valid land size in acres (greater than 0).');
      setResult(null);
      return;
    }
    
    setError('');

    // Dynamic Mock Calculation
    let multiplier = 1.0;
    let recProduct = "Generic Bio Pesticide";
    let safetyInfo = "Wear gloves, mask, and do not spray during high winds.";

    switch(crop) {
      case 'wheat':
        multiplier = 1.2;
        recProduct = "Azadirachtin (Neem-based) 1500 ppm";
        safetyInfo = "Avoid spraying before predicted rainfall. Use protective glasses.";
        break;
      case 'rice':
        multiplier = 2.0;
        recProduct = "Tricyclazole 75% WP";
        safetyInfo = "Do not allow runoff into local water bodies. Wear full PPE.";
        break;
      case 'cotton':
        multiplier = 1.8;
        recProduct = "Spinosad 45% SC";
        safetyInfo = "Spray during early morning or late evening to protect bees.";
        break;
      case 'sugarcane':
        multiplier = 2.5;
        recProduct = "Chlorantraniliprole 18.5% SC";
        safetyInfo = "Ensure uniform coverage. Avoid eating or smoking while spraying.";
        break;
      case 'mustard':
        multiplier = 0.8;
        recProduct = "Thiamethoxam 25% WG";
        safetyInfo = "Highly toxic to honeybees. Avoid foliar application during bloom.";
        break;
      default:
        break;
    }

    const quantity = (parseFloat(land) * multiplier).toFixed(2);
    setResult({
      quantity: `${quantity} Liters`,
      recommended: recProduct,
      safety: safetyInfo
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-4 bg-green-100 dark:bg-gray-800 rounded-xl shadow-md">
          <Calculator className="text-green-600 w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{t.pesticideCalc || "Pesticide Calculator"}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg font-medium">{t.pesticideDesc || "Calculate exact pesticide requirement to avoid overuse"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-md hover:shadow-lg transition-all"
        >
          <form onSubmit={calculatePesticide} className="space-y-6 relative">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">{t.cropType || "Crop Type"}</label>
              <select 
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-shadow shadow-sm font-medium"
              >
                <option value="">{t.selectCrop || "Select Crop..."}</option>
                <option value="wheat">Wheat</option>
                <option value="rice">Rice</option>
                <option value="cotton">Cotton</option>
                <option value="sugarcane">Sugarcane</option>
                <option value="mustard">Mustard</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">{t.landSize || "Land Size (in Acres)"}</label>
              <input 
                type="number" 
                value={land}
                onChange={(e) => setLand(e.target.value)}
                placeholder="e.g., 2.5"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-shadow shadow-sm font-medium placeholder:text-gray-400"
                min="0.1"
                step="0.1"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-sm font-semibold flex items-center space-x-2"
                >
                  <AlertTriangle size={16} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md flex justify-center items-center space-x-2"
            >
              <Calculator size={20} />
              <span>{t.calcReq || "Calculate Requirement"}</span>
            </button>
          </form>
        </motion.div>

        <div>
          {result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 dark:bg-gray-900 rounded-xl border border-green-200 dark:border-gray-800 p-8 space-y-6 shadow-md h-full"
            >
              <h3 className="text-xl font-extrabold flex items-center space-x-2 text-gray-900 dark:text-white">
                <Shield className="text-green-600 w-6 h-6" />
                <span>{t.recommendation || "Recommendation"}</span>
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-semibold">{t.qtyRequired || "Quantity Required"}</p>
                  <p className="text-3xl font-extrabold text-green-600">{result.quantity}</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center space-x-2 font-semibold">
                    <Bug size={16} className="text-amber-500" />
                    <span>{t.recommendedProduct || "Recommended Product"}</span>
                  </p>
                  <p className="font-bold text-gray-900 dark:text-white text-lg">{result.recommended}</p>
                </div>

                <div className="bg-destructive/10 rounded-2xl p-5 border border-destructive/20 flex space-x-3 items-start shadow-sm">
                  <AlertTriangle className="text-destructive text-white w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-destructive text-sm mb-1">{t.safetyInst || "Safety Instructions"}</h4>
                    <p className="text-sm text-white text-destructive/90 leading-relaxed font-medium">{result.safety}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-700 border-dashed shadow-sm">
              <Leaf className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">{t.pesticideEmpty || "Enter your crop and land details to get precise pesticide recommendations and avoid chemical overuse."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
