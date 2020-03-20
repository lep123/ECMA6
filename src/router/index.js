import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Cpt from './cpt'



const routes = [
	{
		component: Cpt.Basic,
		path: '/',
		routes: [
			{
				component: Cpt.UseHook,
				path: '/userhook',
			},
			{
				component: Cpt.Thunk,
				path: '/thunk',
			},
			{
				component: Cpt.Life,
				path: '/',
			},
		]
	},
	
		
]

export default class extends React.PureComponent {
	render () {
		return(
			<BrowserRouter >
					{renderRoutes(routes)}
			</BrowserRouter>
		)
	}
}
