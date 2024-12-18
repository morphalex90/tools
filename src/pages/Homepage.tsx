import Layout from '../components/Layout';
import Aside from '../components/Aside';
import SearchBox from '../components/SearchBox';

export default function Homepage() {
	return (
		<Layout page="homepage">
			<div className="main__content">
				<h1>Tools by Piero Nanni</h1>
				<SearchBox />
				<br />
				<h2>This tool has been created in order to provide a little help when in trouble with SEO problematics</h2>
				{/* <h3>If you have suggestions or if you want to leave a message, contact me</h3> */}
			</div>
			<Aside />
		</Layout>
	);
}