import { createUseI18n } from "keycloakify/login";

export const { useI18n, ofTypeI18n } = createUseI18n({

    ar: {
        continueWithoutAccount: "المتابعة بدون حساب",
    },
    ca: {
        continueWithoutAccount: "Continua sense compte",
    },
    cs: {
        continueWithoutAccount: "Pokračovat bez účtu",
    },
    da: {
        continueWithoutAccount: "Fortsæt uden konto",
    },
    de: {
        continueWithoutAccount: "Weiter ohne Konto",
    },
    el: {
        continueWithoutAccount: "Συνέχεια χωρίς λογαριασμό",
    },
    en: {
        continueWithoutAccount: "Continue Without Account",
    },
    es: {
        continueWithoutAccount: "Continuar sin cuenta",
    },
    fa: {
        continueWithoutAccount: "ادامه بدون حساب",
    },
    fi: {
        continueWithoutAccount: "Jatka ilman tiliä",
    },
    fr: {
        continueWithoutAccount: "Continuer sans compte",
    },
    hu: {
        continueWithoutAccount: "Folytatás fiók nélkül",
    },
    it: {
        continueWithoutAccount: "Continua senza account",
    },
    ja: {
        continueWithoutAccount: "アカウントなしで続行",
    },
    lt: {
        continueWithoutAccount: "Tęsti be paskyros",
    },
    lv: {
        continueWithoutAccount: "Turpināt bez konta",
    },
    nl: {
        continueWithoutAccount: "Doorgaan zonder account",
    },
    no: {
        continueWithoutAccount: "Fortsett uten konto",
    },
    pl: {
        continueWithoutAccount: "Kontynuuj bez konta",
    },
    pt: {
        continueWithoutAccount: "Continuar sem conta",
    },
    "pt-BR": {
        continueWithoutAccount: "Continuar sem conta",
    },
    ru: {
        continueWithoutAccount: "Продолжить без учетной записи",
    },
    sk: {
        continueWithoutAccount: "Pokračovať bez účtu",
    },
    sv: {
        continueWithoutAccount: "Fortsätt utan konto",
    },
    th: {
        continueWithoutAccount: "ดำเนินการต่อโดยไม่ต้องมีบัญชี",
    },
    tr: {
        continueWithoutAccount: "Hesap Olmadan Devam Et",
    },
    uk: {
        continueWithoutAccount: "Продовжити без облікового запису",
    },
    "zh-CN": {
        continueWithoutAccount: "继续，无需账户",
    },

});

export type I18n = typeof ofTypeI18n;
