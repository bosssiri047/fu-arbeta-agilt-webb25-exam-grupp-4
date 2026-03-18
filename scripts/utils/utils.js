export async function checkImageExists(url) {
    try {
        const response = await fetch(url, { method: "HEAD" });
        if(!response.ok) {
            throw new Error('Image does not exist');
        }
        return true;
    } catch (error) {
        alert(error.message);
        return false;
    }
}

export function checkRepeat(userList, editedValue, type) {
    switch(type) {
    case 'username':
        if(userList.find((user) => user.username === editedValue)) {
            return false;
        } else {
            return true;
        }
    case 'password':
        if(userList.find((user) => user.password === editedValue)) {
            return false;
        } else {
            return true;
        }
    case 'email':
        if(userList.find((user) => user.email === editedValue)) {
            return false;
        } else {
            return true;
        }
    }
}