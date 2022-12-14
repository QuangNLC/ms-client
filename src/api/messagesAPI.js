import axiosClient from "./axiosClient";

const messagesAPI = {
    getPrivateMessages: (username) => {
        const url = '/messages/my-private/'+username;
        return axiosClient.get(url);
    },
    getPrivateMessagesForAdm: (username) => {
        const url = 'messages/adm/my-private/'+username;
        return axiosClient.get(url);
    },
    sendPrivateMessagesToAdm: (username, payload) => {
        const url = '/messages/user/send-private/'+username;
        return axiosClient.post(url, payload);
            
    },
    getListMemberForAdm: () => {
        const url = '/messages/adm/get-member-list';
        return axiosClient.get(url);
    },
    replyPrivateMessageFromAdm: (username, payload) => {
        const url = '/messages/adm-private/reply/' + username;
        return axiosClient.post(url, payload);
    },
    getNewMessageCount : () => {
        const url = 'messages/adm/get-message-count';
        return axiosClient.get(url);
    },
    seenByAdm: (username) => {
        const url = 'messages/adm/seen-message/' + username;
        return axiosClient.get(url);
    }


}

export default messagesAPI