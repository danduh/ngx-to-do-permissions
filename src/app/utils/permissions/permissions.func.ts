

export function checkPermissions(required: string, userPerms) {
    const [feature, action] = required.split('_');

    if (!userPerms.hasOwnProperty(feature)) {
        return false;
    }

    if (!userPerms[feature].hasOwnProperty(action)) {
        return false;
    }

    // TODO<Daniel> implementation of property based required
    if (userPerms[feature][action] !== '*') {
        return false;
    }

    return true;

}
