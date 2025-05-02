import { useEffect, useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { useTheme } from "@mui/material/styles";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, locale, messagesPerField, recaptchaRequired, recaptchaSiteKey, termsAcceptanceRequired } = kcContext;

    const { msg, msgStr, enabledLanguages, currentLanguage } = i18n;
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paramLang = urlParams.get("lang");
        const savedLang = localStorage.getItem("lang");
    
        // 1. Use URL param if it exists => store to localStorage
        // 2. Else use any saved localStorage value => put it in the URL
        // 3. Else fall back to default
        if (paramLang) {
          localStorage.setItem("lang", paramLang);
        } else if (savedLang) {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("lang", savedLang);
          window.history.replaceState({}, "", newUrl.toString());
        }
      }, []);
    // Retrieve the 'lang' parameter from the URL
    const langParam = new URL(window.location.href).searchParams.get("lang");


    // Check if the langParam is among the supported languages
    const isSupportedLanguage = locale?.supported.some(
        ({ languageTag }) => languageTag.toLowerCase() === langParam
    );

    // Define defaultLanguageTag, fallback to currentLanguage if not defined
    const defaultLanguageTag = currentLanguage?.languageTag || 'en'; // Replace 'en' with your actual default

    // Determine the currentLanguageTag
    const currentLanguageTag = isSupportedLanguage ? langParam! : defaultLanguageTag;

    // Find the language object from enabledLanguages
    const currentLanguageObj = enabledLanguages.find(
        (lang) => lang.languageTag.toLowerCase() === currentLanguageTag.toLowerCase()
    );

    // Update the i18n.currentLanguage based on the currentLanguageTag
    useEffect(() => {
        if (currentLanguageObj) {
            // Assuming you have a method to set the language, or directly mutate the i18n object
            i18n.currentLanguage = {
                languageTag: currentLanguageObj.languageTag,
                label: currentLanguageObj.label
            };
            // Optionally, update the URL to reflect the current language without reloading
            updateLanguageInURL(currentLanguageObj.languageTag);
        } else {
            console.warn(`Language tag '${currentLanguageTag}' is not enabled. Falling back to default.`);
        }
    }, [currentLanguageTag, currentLanguageObj, i18n]);

        // Function to update the URL without reloading the page
        const updateLanguageInURL = (languageTag: string) => {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', languageTag);
            window.history.replaceState({}, '', url);
        };
    
    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);
    const theme = useTheme();

    // Set the header color based on the theme
    const headerColor = theme.palette.mode === "dark" ? "#ffffff" : "#000000";

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={<div style={{ color: headerColor }}>{msg("registerTitle")}</div>}
            displayMessage={messagesPerField.exists("global")}
            
            
        >
            <form id="kc-register-form" className={kcClsx("kcFormClass")} action={url.registrationAction} method="post">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
                {termsAcceptanceRequired && (
                    <TermsAcceptance
                        i18n={i18n}
                        kcClsx={kcClsx}
                        messagesPerField={messagesPerField}
                        areTermsAccepted={areTermsAccepted}
                        onAreTermsAcceptedValueChange={setAreTermsAccepted}
                    />
                )}
                {recaptchaRequired && (
                    <div className="form-group">
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}></div>
                        </div>
                    </div>
                )}
                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")}>
                            <span>
                                <a href={url.loginUrl}>{msg("backToLogin")}</a>
                            </span>
                        </div>
                    </div>
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <input
                            disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                            className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            type="submit"
                            value={msgStr("doRegister")}
                        />
                    </div>
                </div>
            </form>
        </Template>
    );
}

function TermsAcceptance(props: {
    i18n: I18n;
    kcClsx: KcClsx;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const { i18n, kcClsx, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

    const { msg } = i18n;

    return (
        <>
            <div className="form-group">
                <div className={kcClsx("kcInputWrapperClass")}>
                    {msg("termsTitle")}
                    <div id="kc-registration-terms-text">{msg("termsText")}</div>
                </div>
            </div>
            <div className="form-group">
                <div className={kcClsx("kcLabelWrapperClass")}>
                    <input
                        type="checkbox"
                        id="termsAccepted"
                        name="termsAccepted"
                        className={kcClsx("kcCheckboxInputClass")}
                        checked={areTermsAccepted}
                        onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                        aria-invalid={messagesPerField.existsError("termsAccepted")}
                    />
                    <label htmlFor="termsAccepted" className={kcClsx("kcLabelClass")}>
                        {msg("acceptTerms")}
                    </label>
                </div>
                {messagesPerField.existsError("termsAccepted") && (
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <span
                            id="input-error-terms-accepted"
                            className={kcClsx("kcInputErrorMessageClass")}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: messagesPerField.get("termsAccepted")
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
