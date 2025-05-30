export const register_me = async (formData) => {
    try {
        const res = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in register (service) => ', error);
    }
}

export const login_me = async (formData) => {
    try {
        const res = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('error in login (service) => ', error);
        return { success: false, message: "An error occurred during login" };
    }
}

export const forget_password = async (formData) => {
    try {
        const res = await fetch(`/api/auth/forgetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in forget Password (service) => ', error);
    }
}

