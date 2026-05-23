import { useState } from 'react';
import { UploadCloud, FileSearch, ShieldCheck, Bug, Search, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { detectDisease } from '../services/api';
import { toast } from 'sonner';

export const Disease = () => {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setAnalyzing(true);
    setResult(null);

    try {
      // Convert file to base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const data = await detectDisease(base64, file.type || 'image/jpeg');
      setResult(data);
      toast.success('Analysis complete!');
    } catch (err) {
      toast.error('Analysis failed. Please try again.');
      setResult({
        disease: 'Analysis Error', confidence: 'N/A', severity: 'Unknown',
        solution: 'Could not analyze the image. Please try a clearer photo.',
        pesticide: 'Consult a local agronomist.',
        prevention: 'Maintain proper plant hygiene.',
        isHealthy: false,
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const severityColor = { Low: 'text-yellow-600', Medium: 'text-orange-600', High: 'text-red-600', None: 'text-green-600', Unknown: 'text-gray-600' };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl"><Bug className="text-red-600 w-8 h-8" /></div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Disease Detection</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Upload a crop image — Gemini AI will diagnose diseases instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload */}
        <label className="block w-full cursor-pointer group">
          <div className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${image ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-gray-300 dark:border-gray-700 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/10'} aspect-video flex flex-col items-center justify-center relative overflow-hidden`}>
            {image ? (
              <>
                <img src={image} alt="Crop" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity" />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <UploadCloud className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-white text-lg">Click to upload a different image</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-green-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Upload crop image</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto text-sm">Take a clear photo of the affected leaf or plant part. Supported: JPG, PNG, WEBP</p>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>
        </label>

        {/* Results */}
        <div>
          {analyzing ? (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-md">
              <div className="relative mb-6">
                <div className="w-24 h-24 border-4 border-green-200 dark:border-gray-700 rounded-full animate-pulse absolute inset-0"></div>
                <div className="w-24 h-24 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <Search className="w-10 h-10 text-green-600 absolute inset-0 m-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Analyzing with Gemini AI...</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">Scanning against thousands of known plant diseases</p>
            </div>
          ) : result ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
              <div className={`p-6 border-b flex items-center justify-between ${result.isHealthy ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
                <div className="flex items-center space-x-3">
                  {result.isHealthy ? <Leaf className="text-green-600 w-7 h-7" /> : <ShieldCheck className="text-red-600 w-7 h-7" />}
                  <h3 className={`text-xl font-bold ${result.isHealthy ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                    {result.isHealthy ? 'Plant is Healthy ✓' : 'Disease Detected'}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Confidence</span>
                  <span className="font-bold text-gray-900 dark:text-white">{result.confidence}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Diagnosis</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.disease}</p>
                  {result.severity && (
                    <span className={`text-sm font-semibold ${severityColor[result.severity] || 'text-gray-600'}`}>
                      Severity: {result.severity}
                    </span>
                  )}
                </div>

                <div className="p-4 bg-blue-50 dark:bg-gray-800 rounded-2xl border border-blue-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Treatment Plan
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{result.solution}</p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-gray-800 rounded-2xl border border-green-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Chemical Recommendation
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">{result.pesticide}</p>
                </div>

                {result.prevention && (
                  <div className="p-4 bg-amber-50 dark:bg-gray-800 rounded-2xl border border-amber-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span> Prevention
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{result.prevention}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-center">
              <FileSearch className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Awaiting Image</h3>
              <p className="text-gray-500 dark:text-gray-400">Upload a photo to get AI-powered disease detection results here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
