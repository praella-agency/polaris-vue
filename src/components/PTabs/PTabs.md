PTabs example:

```vue
<template>
    <div>
        <PTabs :tabs="menu" :selected="selectedMenuIndex" @select="selectMenu">
        
        </PTabs>    
    </div>
</template>

<script>

export default {
    data() {
        return {
            menu: [
                {
                    id: 'collections',
                    content: 'Collections',
                    path: '/collections'
                },
                {
                    id: 'customers',
                    content: 'Customers',
                    path: '/customers'
                },
                {
                    id: 'multiple-edit',
                    content: 'MultipleEdit',
                    path: '/multiple-edit'
                },
                {
                    id: 'products',
                    content: 'Products',
                    path: '/products'
                },

            ],
            selectedMenuIndex: 0,
        }
    },
    methods: {
        selectMenu(menuIndex) {
            this.selectedMenuIndex = menuIndex;
            alert('Tab changed.' + this.menu[this.selectedMenuIndex].path);
        },
    }
}

</script>
```