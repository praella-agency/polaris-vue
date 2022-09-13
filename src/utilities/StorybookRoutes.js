const routes = function (items, key) {
    let route = [
        {
            path: '/',
            name: '',
            component: {
                template: '',
            }
        }
    ];
    items.forEach((item) => {
        route.push({
            path: typeof item[key] === 'object' ? item[key].path : item[key],
            name: typeof item[key] === 'object' ? item[key].path : item[key],
            component: {
                template: '',
            }
        });
    });

    return route;
}

export default routes;
