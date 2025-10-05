import './App.css';
import { React } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, PlaylistCards, SongCards, Statusbar } from './components'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
const App = () => {
    return (
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={PlaylistCards} />
                <Route path="/playlist/:id" exact component={SongCards} />
            </Switch>
            <Statusbar />
        </Router>
    )
}

export default App