import { AlertCircle, CheckCircle } from "lucide-react";
import { SpecialtyOverviewContent } from "@/interface/response";
import { LanguageCode } from "@/i18n/config";

interface OverviewProps {
  content: SpecialtyOverviewContent;
  locale: LanguageCode;
}

const Overview = ({ content, locale }: OverviewProps) => {
  const t = {
    title: locale === "vi" ? "là gì?" : "What is",
    treatments: locale === "vi" ? "Phạm vi điều trị" : "Treatment Scope",
    symptoms: locale === "vi" ? "Khi nào cần khám?" : "When to Visit?",
    urgent: locale === "vi" ? "CẦN KHÁM NGAY" : "URGENT",
    riskFactors: locale === "vi" ? "Các yếu tố nguy cơ" : "Risk Factors",
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-400 mx-auto px-4 gap-[1.6rem] flex flex-col">
        <div>
          <div className="text-gray-700 space-y-4 mb-8">
            <p>{content.intro}</p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">{t.treatments}</h3>
            <div className="grid grid-cols-2 gap-3">
              {content?.treatments?.map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-medium capitalize">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-red-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-red-900 mb-6">⚠️ {t.symptoms}</h3>
            <div className="space-y-4">
              {content.symptoms?.map((symptom, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg">
                  <AlertCircle
                    className={`w-6 h-6 flex-shrink-0 ${
                      symptom.severity === "high"
                        ? "text-red-600"
                        : symptom.severity === "medium"
                          ? "text-orange-600"
                          : "text-yellow-600"
                    }`}
                  />
                  <div>
                    <div className="font-semibold text-gray-900 capitalize">{symptom.text}</div>
                    {symptom.severity === "high" && (
                      <span className="text-xs text-red-600 font-bold">{t.urgent}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-orange-900 mb-6">{t.riskFactors}</h3>
            <ul className="space-y-3">
              {content.riskFactors?.map((factor, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="capitalize">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
