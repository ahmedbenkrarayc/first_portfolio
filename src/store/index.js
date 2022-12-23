import { createStore } from 'vuex'
//import firebase from '../config/firebase'

export default createStore({
  state: {
    informations:{}
  },
  getters: {
  },
  mutations: {
   /* getInfo(state){
      firebase.firestore.collection('Informations').get().then((data) => {
        data.forEach(x => {
          state.informations = x.data()
        })
      })
    }*/
  },
  actions: {
    
    /*setInfos(){
      var experience = [
        {
          duration: '2021 - 2022',
          title : 'Android Developer',
          company : 'BC Skills Group · Apprenticeship',
          time : 'Mar 2021 · 1 mo',
          date : new Date()
        },
        {
          duration: '2022 - 2023',
          title : 'SMART SERVICES & TOOLS · Internship',
          company : 'Hassan II high schoolSpecialized Institute Of Applied Technology NTIC',
          time : 'Jan 2022 - Apr 2022 · 4 mos',
          date : new Date()
        },

      ]

      experience.forEach(x => {
        firebase.firestore.collection('Experience').add(x).then(() => {
          console.log('success')
        }).catch(error => {
          console.log(error)
        })
      })


    }*/

    /*async getInfo({commit}){
      await commit('getInfo')
    }*/

  },
  modules: {
  }
})
