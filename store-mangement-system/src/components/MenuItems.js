const menu = [
    {
        label: 'Favorites',
        icon: 'pi pi-fw pi-home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Category', icon: 'pi pi-fw pi-list', to: '/category' },
            { label: 'Employee', icon: 'pi pi-fw pi-users', to: '/employee' },
            { label: 'Products', icon: 'pi pi-fw pi-check', to: '/products' },
            { label: 'Customer', icon: 'pi pi-fw pi-user-plus', to: '/customer' },
            { label: 'order', icon: 'pi pi-fw pi-chart-bar', to: '/order' }
        ]
    },
    { separator: true }
];
export {menu}