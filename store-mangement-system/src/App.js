import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import {useLocation } from 'react-router-dom';

import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppConfig from './AppConfig';
import AppSearch from './AppSearch';
import AppRightMenu from './AppRightMenu';
import {menu} from './components/MenuItems'
import {breadcrumb} from './components/BreadcrumItem'

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';
import RoutesItems from './service/RouterItems';

const App = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [menuMode, setMenuMode] = useState('static');
    const [colorScheme, setColorScheme] = useState('light');
    const [menuTheme, setMenuTheme] = useState('layout-sidebar-darkgray');
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false);
    const [topbarNotificationMenuActive, setTopbarNotificationMenuActive] = useState(false);
    const [rightMenuActive, setRightMenuActive] = useState(false);
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const [logoColor, setLogoColor] = useState('white');
    const [componentTheme, setComponentTheme] = useState('blue');
    const [logoUrl, setLogoUrl] = useState('assets/layout/images/logo-dark.svg');
    const copyTooltipRef = useRef();
    const location = useLocation();

    let menuClick = false;
    let searchClick = false;
    let userMenuClick = false;
    let notificationMenuClick = false;
    let rightMenuClick = false;
    let configClick = false;

    let meta = breadcrumb.find((obj) => {
        return obj.path === location.pathname;
    });

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const changeMenuTheme = (name, logoColor, componentTheme) => {
        onMenuThemeChange(name);
        changeStyleSheetUrl('theme-css', componentTheme, 2);
        setComponentTheme(componentTheme);

        const appLogoLink = document.getElementById('app-logo');
        const appLogoUrl = `assets/layout/images/logo-${logoColor === 'dark' ? 'dark' : 'white'}.svg`;
        const horizontalLogoLink = document.getElementById('logo-horizontal');
        const horizontalLogoUrl = `assets/layout/images/logo-${logoColor === 'dark' ? 'dark' : 'white'}.svg`;

        if (appLogoLink) {
            appLogoLink.src = appLogoUrl;
        }
        if (horizontalLogoLink) {
            horizontalLogoLink.src = horizontalLogoUrl;
        }
        setLogoColor(logoColor);
    };

    const changeComponentTheme = (theme) => {
        setComponentTheme(theme);
        changeStyleSheetUrl('theme-css', theme, 3);
    };

    const changeColorScheme = (e) => {
        setColorScheme(e.value);

        const scheme = e.value;
        changeStyleSheetUrl('layout-css', 'layout-' + scheme + '.css', 1);
        changeStyleSheetUrl('theme-css', 'theme-' + scheme + '.css', 1);

        changeLogo(scheme);
    };

    const changeStyleSheetUrl = (id, value, from) => {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute('href').split('/');

        if (from === 1) {
            // which function invoked this function
            urlTokens[urlTokens.length - 1] = value;
        } else if (from === 2) {
            // which function invoked this function
            if (value !== null) {
                urlTokens[urlTokens.length - 2] = value;
            }
        } else if (from === 3) {
            // which function invoked this function
            urlTokens[urlTokens.length - 2] = value;
        }

        const newURL = urlTokens.join('/');

        replaceLink(element, newURL);
    };

    const changeLogo = (scheme) => {
        const appLogoLink = document.getElementById('app-logo');
        const mobileLogoLink = document.getElementById('logo-mobile');
        const invoiceLogoLink = document.getElementById('invoice-logo');
        const footerLogoLink = document.getElementById('footer-logo');
        const horizontalLogoLink = document.getElementById('logo-horizontal');
        setLogoUrl(`assets/layout/images/logo-${scheme === 'light' ? 'dark' : 'white'}.svg`);

        if (appLogoLink) {
            appLogoLink.src = `assets/layout/images/logo-${scheme === 'light' ? logoColor : 'white'}.svg`;
        }

        if (horizontalLogoLink) {
            horizontalLogoLink.src = `assets/layout/images/logo-${scheme === 'light' ? logoColor : 'white'}.svg`;
        }

        if (mobileLogoLink) {
            mobileLogoLink.src = logoUrl;
        }

        if (invoiceLogoLink) {
            invoiceLogoLink.src = logoUrl;
        }

        if (footerLogoLink) {
            footerLogoLink.src = logoUrl;
        }
    };

    const replaceLink = (linkElement, href) => {
        if (isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                const _linkElement = document.getElementById(id);
                _linkElement && _linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    };

    const isIE = () => {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onDocumentClick = () => {
        if (!searchClick && searchActive) {
            onSearchHide();
        }

        if (!userMenuClick) {
            setTopbarUserMenuActive(false);
        }

        if (!notificationMenuClick) {
            setTopbarNotificationMenuActive(false);
        }

        if (!rightMenuClick) {
            setRightMenuActive(false);
        }

        if (!menuClick) {
            if (isSlim() || isHorizontal()) {
                setMenuActive(false);
            }

            if (overlayMenuActive || staticMenuMobileActive) {
                hideOverlayMenu();
            }

            unblockBodyScroll();
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        searchClick = false;
        configClick = false;
        userMenuClick = false;
        rightMenuClick = false;
        notificationMenuClick = false;
        menuClick = false;
    };

    const onMenuClick = () => {
        menuClick = true;
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarUserMenuActive(false);
        setTopbarNotificationMenuActive(false);
        setRightMenuActive(false);

        if (isOverlay()) {
            setOverlayMenuActive((prevOverlayMenuActive) => !prevOverlayMenuActive);
        }

        if (isDesktop()) {
            setStaticMenuDesktopInactive((prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive);
        } else {
            setStaticMenuMobileActive((prevStaticMenuMobileActive) => !prevStaticMenuMobileActive);
        }

        event.preventDefault();
    };

    const onMenuitemClick = (event) => {
        if (!event.item.items) {
            hideOverlayMenu();

            if (isSlim() || isHorizontal()) {
                setMenuActive(false);
            }
        }
    };

    const onRootMenuitemClick = () => {
        setMenuActive((prevMenuActive) => !prevMenuActive);
    };

    const onMenuThemeChange = (name) => {
        setMenuTheme('layout-sidebar-' + name);
    };

    const onMenuModeChange = (e) => {
        setMenuMode(e.value);
        if (e.value === 'static') {
            setStaticMenuDesktopInactive(false);
        }
    };

    const onTopbarUserMenuButtonClick = (event) => {
        userMenuClick = true;
        setTopbarUserMenuActive((prevTopbarUserMenuActive) => !prevTopbarUserMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const onTopbarNotificationMenuButtonClick = (event) => {
        notificationMenuClick = true;
        setTopbarNotificationMenuActive((prevTopbarNotificationMenuActive) => !prevTopbarNotificationMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const toggleSearch = () => {
        setSearchActive((prevSearchActive) => !prevSearchActive);
        searchClick = true;
    };

    const onSearchClick = () => {
        searchClick = true;
    };

    const onSearchHide = () => {
        setSearchActive(false);
        searchClick = false;
    };

    const onRightMenuClick = () => {
        rightMenuClick = true;
    };

    const onRightMenuButtonClick = (event) => {
        rightMenuClick = true;
        setRightMenuActive((prevRightMenuActive) => !prevRightMenuActive);
        hideOverlayMenu();
        event.preventDefault();
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive((prevConfigActive) => !prevConfigActive);
        configClick = true;
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
        unblockBodyScroll();
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isOverlay = () => {
        return menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 1091;
    };

    const containerClassName = classNames(
        'layout-wrapper',
        {
            'layout-overlay': menuMode === 'overlay',
            'layout-static': menuMode === 'static',
            'layout-slim': menuMode === 'slim',
            'layout-horizontal': menuMode === 'horizontal',
            'layout-sidebar-dim': colorScheme === 'dim',
            'layout-sidebar-dark': colorScheme === 'dark',
            'layout-overlay-active': overlayMenuActive,
            'layout-mobile-active': staticMenuMobileActive,
            'layout-static-inactive': staticMenuDesktopInactive && menuMode === 'static',
            'p-input-filled': inputStyle === 'filled',
            'p-ripple-disabled': !ripple
        },
        colorScheme === 'light' ? menuTheme : ''
    );

    return (
        <div className={containerClassName} data-theme={colorScheme} onClick={onDocumentClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <div className="layout-content-wrapper">
                <AppTopbar
                    meta={meta}
                    topbarNotificationMenuActive={topbarNotificationMenuActive}
                    topbarUserMenuActive={topbarUserMenuActive}
                    onMenuButtonClick={onMenuButtonClick}
                    onSearchClick={toggleSearch}
                    onTopbarNotification={onTopbarNotificationMenuButtonClick}
                    onTopbarUserMenu={onTopbarUserMenuButtonClick}
                    onRightMenuClick={onRightMenuButtonClick}
                    onRightMenuButtonClick={onRightMenuButtonClick}
                    menu={menu}
                    menuMode={menuMode}
                    menuActive={menuActive}
                    staticMenuMobileActive={staticMenuMobileActive}
                    onMenuClick={onMenuClick}
                    onMenuitemClick={onMenuitemClick}
                    onRootMenuitemClick={onRootMenuitemClick}
                ></AppTopbar>

                <div className="layout-content">
                    <div className="layout-breadcrumb viewname" style={{ textTransform: 'uppercase' }}>
                        Dashboard
                    </div>
                    <RoutesItems location={location} logoUrl={logoUrl} colorScheme={colorScheme}/>
                </div>

                <AppFooter />
            </div>

            <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuClick={onRightMenuClick}></AppRightMenu>

            <AppConfig
                configActive={configActive}
                menuMode={menuMode}
                onMenuModeChange={onMenuModeChange}
                colorScheme={colorScheme}
                changeColorScheme={changeColorScheme}
                menuTheme={menuTheme}
                changeMenuTheme={changeMenuTheme}
                componentTheme={componentTheme}
                changeComponentTheme={changeComponentTheme}
                onConfigClick={onConfigClick}
                onConfigButtonClick={onConfigButtonClick}
                rippleActive={ripple}
                onRippleChange={onRippleChange}
                inputStyle={inputStyle}
                onInputStyleChange={onInputStyleChange}
            ></AppConfig>

            <AppSearch searchActive={searchActive} onSearchClick={onSearchClick} onSearchHide={onSearchHide} />
        </div>
    );
};

export default App;
