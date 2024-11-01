import app from './app';
import APP_CONFIG from './config/config';
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    /* eslint-disable no-console */
    if (process.env.NODE_ENV !== 'test') {
        console.log('=============================================================');
        console.log(APP_CONFIG.app.title);
        console.log('=============================================================');
        console.log('Environment:     ' + APP_CONFIG.NodeEnv);
        console.log('Server:          ' + `http://localhost:${PORT}/`);
        console.log('App version:     ' + '0.0.1');
        console.log('=============================================================');
    }
    /* eslint-enable no-console */
});
export default server;
