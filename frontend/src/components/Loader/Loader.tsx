import clsx from 'clsx'
import Classes from './Loader.module.css'

/*!
 * CSS from Loader.module.css adapted
 * from https://projects.lukehaas.me/css-loaders/
 * Copyright (c) 2014 Luke Haas
 * The MIT License (MIT)
 *
*/

const classLoadingPage: string = Classes.loadingPage
const classLoader: string = Classes.loader

const Loader = () => (
	<div className={clsx(
		classLoadingPage,
		'position-fixed',
		'd-flex justify-content-center align-items-center'
	)}>
		<div className={classLoader} />
	</div>
)

export default Loader
