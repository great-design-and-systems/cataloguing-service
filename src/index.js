import express from 'express';
import { GDSDatabase, GDSServer, GDSServices, GDSUtil } from 'gds-config';
const app = express();
const PORT = process.env.PORT || 5000;

import CataloguingResource from './boundary/cataloguing-resource';

new GDSDatabase().connect((errDB) => {
    if (errDB) {
        console.error(errDB);
    } else {
        new GDSServer(app);
        new GDSUtil().getLogger(() => {
            app.listen(PORT, () => {
                global.gdsLogger.logInfo('Express is listening to port ' + PORT);
                new CataloguingResource(app);
            });
        })
    }
});


export default app;



