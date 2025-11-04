export const ENDPOINTS = {
    PATIENTS: {
        // ALL:"/patient",
        CREATE:"/patient",
        BY_ID: (id) =>`/patient/${id}`,  
        LOGIN: '/patient/login',
        LOGOUT: 'patient/logout'
        // UPDATE_BY_ID:(id) =>`/patient/${id}`,
        // DELETE:(id) =>`/patient/${id}`,
    },

    APPOINTMENTS: {
        // ALL: "/appointment",
        CREATE: "/appointment",
        CANCEL: (id) =>`/appointment/cancel/${id}`, //cancel appointment
        BY_PATIENT_ID: (id) =>`/appointment/${id}`,   //appoinment by patient id
    },
    
    BILLS: {
    // ALL: "/bill",
    // CREATE: "/bill",
    // BY_ID: (id) => `/bill/${id}`,                       // GET one bill
    BY_PATIENT: (patientId) => `/bill/patient/${patientId}`,
    // MARKED_PAY: (id) => `/${id}/pay`,                   // PATCH mark as paid
    // DISCOUNT: (id) => `/${id}/pay`,
    // DELETE: (id) => `/bill/${id}`,
    },

    DOCTOR: {
        ALL: "/doctor",
        // CREATE: "/doctor",
        BY_ID: (id) => `/doctor/${id}`,
    },

    SERVICE : {
        ALL: "/service",
        // CREATE: "/service",
        BY_ID: (id) => `/service/${id}`,
        // UPDATE_BY_ID:(id) =>`/service/${id}`,
        // DELETE:(id) =>`/service/${id}`

    }
}