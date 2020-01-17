export const setLocalStorage=(user)=>
{
    localStorage.setItem("user", JSON.stringify(user));
}

export const getLocalStorage=(email)=>
{
    if(localStorage.getItem("user",email))
    {
        return 1;
    }
    else{
        return 0;
    }
}
export const removeLocalStorage=(email)=>
{
    localStorage.removeItem("user",email);

}