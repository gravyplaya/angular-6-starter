const PROXY_CONFIG = {
  "/api/*": {
    // "target": "http://10.211.55.14:7764",
    // "secure": false,
    // "changeOrigin": true,
    // "pathRewrite": {"^/api" : ""},
    // "auth": "multichainrpc:5rpeWjLSZNpnLmrgpdaGZ5GVE7HV867rqYdDmWpvxWJh",
    // "logLevel": "debug"

    target: "http://ec2-34-212-51-208.us-west-2.compute.amazonaws.com:4248",
    secure: false,
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
    auth: "multichainrpc:CCuzfFKoHuZuUPLo1Mgr5mUDBa6PXGagNZrrKFrCavW",
    logLevel: "debug"
  }
};

module.exports = PROXY_CONFIG;
