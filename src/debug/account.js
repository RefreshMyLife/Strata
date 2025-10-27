let reqOrigin = window.ethereum.request;
window.ethereum.request = function (req) {
    console.log(req);
    if (req.method === 'eth_requestAccounts' || req.method === 'eth_accounts') {
        return Promise.resolve(['0x3131c1da2b2ece38d8817f8c24248f013c366f38']);
    }

    return reqOrigin.call(this, req);
};
