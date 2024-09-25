# About
Project ini dibuat untuk keperluan belajar Set Up Vue.js, akan kita buat sebuah Single Page Application pada local machine

# Prerequisite
1. Pastikan Node.js sudah terinstall, tambahkan ke path variable (windows)
2. Install Vue CLI
3. Install Vue Router
4. Install Axios
5. Install Vuex
6. Spring Boot

# Dependecy:
1. [Node and NPM](https://nodejs.org/en/download/package-manager)
2. [Vue CLI](https://cli.vuejs.org/guide/installation.html)
3. [Vue JS](https://vuejs.org/guide/quick-start)
4. [Vue Router](https://router.vuejs.org/installation.html)
5. [Axios](https://axios-http.com/docs/intro)
6. [Vuex](https://vuex.vuejs.org/installation.html#npm)
7. [Bootstrap stylesheet](https://getbootstrap.com/)

# References
- [Node Official Website](https://nodejs.org/en/download/package-manager)
- [Vue Quick Start](https://vuejs.org/guide/quick-start.html)
- [Vue Overview](https://cli.vuejs.org/guide/)
- [Localstorage](https://www.w3schools.com/jsref/prop_win_localstorage.asp)
- [Creating a router instance](https://router.vuejs.org/guide/)
- [Accessing url parameter using router instance](https://router.vuejs.org/guide/essentials/dynamic-matching.html)
- [Axios Documentation](https://axios-http.com/docs/instance)
- [Sample Backend API](https://github.com/bezkoder/spring-boot-h2-database-crud)
- [Writing a Vuex Instance](https://blog.openreplay.com/learn-how-mapping-works-in-vuex/)
- [VeeValidate using Composition API](https://vee-validate.logaretm.com/v4/guide/composition-api/getting-started/)

## Regarding Sample Backend API
1. change origin at @CrossOrigin(origin = "http://localhost:5173") on TutorialController.java
2. to access h2 DB run this command: mvn spring-boot:run
3. H2 DB by default can be accessed at http://localhost:8080/h2-ui

## Regarding vuex
a vuex instance will roughly looks like this:
```javascript
const store = new Store({
    state: {
        //shareable data accross components
        //think of it as an attribute in OOP term
    },
    mutations: {
        //state setters, a mutation can only be
        //changed using mutation, a mutations must
        //be commit-ed
    },
    getters:{
        //state getters, a state must be accessed
        //through getters methods
    },
    actions:{
        //exists because a regular mutations
        //can't handle async methods, an 
        //actions must be dispatch-ed
    },
    modules:{
        //exists so that a singular store
        //doesn't appears to be bloated
    }
})
``` 

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```