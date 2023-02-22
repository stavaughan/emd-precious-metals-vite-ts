import { app } from './app';
import { errorHandler } from './middleware/errorMiddleware';

app.use(errorHandler);

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  // eslint-disable-next-line no-console
  console.log('  Press CTRL-C to stop\n');
});
