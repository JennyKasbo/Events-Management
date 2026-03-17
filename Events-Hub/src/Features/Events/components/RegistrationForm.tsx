import { useEffect, useState } from "react";
import { useThemeLocale } from "../../../Context/ThemeLocaleContext";

interface RegistrationModalProps {
  isOpen: boolean;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    linkedinProfile: string;
    educationLevel: string;
    motivation: string;
  }) => void;
}

export const RegistrationModal = ({
  isOpen,
  isSubmitting,
  onClose,
  onSubmit,
}: RegistrationModalProps) => {
  const { theme, t,language } = useThemeLocale();
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [educationLevel, setEducationLevel] = useState("BACHELORS");
  const [motivation, setMotivation] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setLinkedinUrl("");
      setEducationLevel("BACHELORS");
      setMotivation("");
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    setError(null);
    onSubmit({
      linkedinProfile: linkedinUrl.trim(),
      educationLevel,
      motivation: motivation.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div
        className={`w-full max-w-md rounded-2xl p-6 text-base shadow-[0_20px_40px_rgba(0,0,0,0.25)] ${
          theme === "dark" ? "bg-[#1A1C23] text-slate-100" : "bg-white text-slate-800"
        }`}
      >
        <h3 className="text-xl font-semibold">{t("registerForEvent")}</h3>
        <p className={`mt-2 text-base ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
          {t("shareLinkedin")}
        </p>
        <input
          type="url"
          placeholder={t("linkedinPlaceholder")}
          value={linkedinUrl}
          onChange={(event) => setLinkedinUrl(event.target.value)}
          className={`mt-4 w-full rounded-xl border px-4 py-3 text-base outline-none ${
            theme === "dark"
              ? "border-white/10 bg-[#0F1117] text-slate-200"
              : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        />
        <select
          value={educationLevel}
          onChange={(event) => setEducationLevel(event.target.value)}
          className={`mt-3 w-full rounded-xl border px-4 py-3 text-base outline-none ${
            theme === "dark"
              ? "border-white/10 bg-[#0F1117] text-slate-200"
              : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        >
          <option value="BACHELORS">{t("bachelors")}</option>
          <option value="MASTERS">{t("masters")}</option>
          <option value="PHD">{t("phd")}</option>
          <option value="OTHER">{t("other")}</option>
        </select>
        <textarea
          placeholder={t("motivationPlaceholder")}
          value={motivation}
          onChange={(event) => setMotivation(event.target.value)}
          className={`mt-3 min-h-[110px] w-full rounded-xl border px-4 py-3 text-base outline-none ${
            theme === "dark"
              ? "border-white/10 bg-[#0F1117] text-slate-200"
              : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        />
        {error ? <p className="mt-2 text-base text-rose-300">{error}</p> : null}
        <div className="mt-6 flex items-center justify-end gap-3" dir={language === "ar" ? "ltr" : "rtl"}>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-full border px-4 py-2 text-base transition ${
              theme === "dark"
                ? "border-white/10 text-slate-300 hover:text-white"
                : "border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            {t("cancel")}
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="rounded-full bg-violet-500 px-5 py-2 text-base font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? t("submitting") : t("submit")}
          </button>
        </div>
      </div>
    </div>
  );
};
