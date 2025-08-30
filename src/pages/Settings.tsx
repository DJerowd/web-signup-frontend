import React from "react";
import { useSettings } from "../contexts/SettingsContext";
import ToggleSwitch from '../components/ToggleSwitch';

import styles from "../styles/pages/Settings.module.css";

const Settings: React.FC = () => {
  const { theme, setTheme, fontSize, setFontSize, highContrast, setHighContrast, motion, setMotion } = useSettings();

  return (
    <div className={styles.settingsPage}>
      <h1 className="title">Configurações</h1>

      <div className={styles.settingsCard}>
        <div className={styles.settingGroup}>
          <h2 className={styles.groupTitle}>Tema da Aplicação</h2>
          <div className={styles.options}>
            {(["light", "dark", "system"] as const).map((t) => (
              <label key={t} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="theme"
                  value={t}
                  checked={theme === t}
                  onChange={() => setTheme(t)}
                />
                <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.settingGroup}>
          <h2 className={styles.groupTitle}>Tamanho da Fonte</h2>
          <div className={styles.options}>
            {(["small", "medium", "large"] as const).map((s) => (
              <label key={s} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="fontSize"
                  value={s}
                  checked={fontSize === s}
                  onChange={() => setFontSize(s)}
                />
                <span>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.settingGroup}>
          <h2 className={styles.groupTitle}>Acessibilidade</h2>
          <div className={styles.accessibilityOptions}>
            <ToggleSwitch
              label="Modo de Alto Contraste"
              checked={highContrast}
              onChange={setHighContrast}
            />
            <div className={styles.radioGroup}>
              
              <p>Animações e Movimento:</p>
              {(['normal', 'reduced'] as const).map((m) => (
                <label key={m} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="motion"
                    value={m}
                    checked={motion === m}
                    onChange={() => setMotion(m)}
                  />
                  <span>{m === 'normal' ? 'Normal' : 'Reduzido'}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
