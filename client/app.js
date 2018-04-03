import React from 'react'
import { render, hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { lightBlue, pink } from 'material-ui/colors'

import App from './views/App'
import { AppState, TopicStore } from './store/store'

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
        accent: pink,
        type: 'light',
    },
})

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line

const createApp = (TheApp) => {
    class Main extends React.Component {
        componentDidMount() {
            const jssStyles = document.getElementById('jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        render() {
            return <TheApp />
        }
    }

    return Main
}

const appState = new AppState(initialState.appState);
const topicStore = new TopicStore(initialState.topicStore);

// 服务端是没有DOM和window对象的
const root = document.getElementById('root');

const renderHtml = (Component) => {
    const renderMethod = module.hot ? render : hydrate;
    renderMethod(
      <AppContainer>
        <Provider appState={appState} topicStore={topicStore}>
          <BrowserRouter>
            <MuiThemeProvider theme={theme}>
              <Component />
            </MuiThemeProvider>
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      root,
    )
}
renderHtml(createApp(App))
if (module.hot) {
    module.hot.accept('./views/App', () => {
        const NextApp = require('./views/App').default; // eslint-disable-line
        renderHtml(createApp(<NextApp />));
    })
}
