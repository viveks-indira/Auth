const sessionIdtoUserMap=new Map();

export function setUser(id,user){
    sessionIdtoUserMap.set(id,user);
}

export function getUser(id){
    sessionIdtoUserMap.set(id);
}

export default {setUser,getUser};