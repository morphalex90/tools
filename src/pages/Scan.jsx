// import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Layout from "../components/Layout";
import '../sass/tabs.scss'
import '../sass/table.scss'

export default function Scan() {
	let { scan_uuid } = useParams();

	const [isLoading, setIsLoading] = useState(false);


	const [scan, setScan] = useState(null);
	const [stepLinks, setStepLinks] = useState(null); const [stepLinksCount, setStepLinksCount] = useState(null);
	const [stepImages, setStepImages] = useState(null); const [stepImagesCount, setStepImagesCount] = useState(null);
	const [stepHeadings, setStepHeadings] = useState(null); const [stepHeadingsCount, setStepHeadingsCount] = useState(null);
	const [stepMeta, setStepMeta] = useState(null); const [stepMetaCount, setStepMetaCount] = useState(null);
	const [stepRobots, setStepRobots] = useState(null);
	const [stepSitemap, setStepSitemap] = useState(null);
	const [stepOthers, setStepOthers] = useState(null); const [stepOthersCount, setStepOthersCount] = useState(null);
	const [stepStructuredData, setStepStructuredData] = useState(null); const [stepStructuredDataCount, setStepStructuredDataCount] = useState(null);

	useEffect(() => {

		async function fetchData() {
			setIsLoading(true);

			await axios.get(import.meta.env.VITE_API_URL + '/api/v1/tools/scans/' + scan_uuid)
				.then((response) => {
					setScan(response.data.scan);
					// console.log(response.data.scan);

					stepLinksFunct();
					stepImagesFunct();
					stepHeadingsFunct();
					stepMetaFunct();
					stepRobotsFunct();
					stepSitemapFunct();
					stepOthersFunct();
					stepStructuredDataFunct();
				});
		}
		fetchData();
	}, []);

	const stepLinksFunct = () => {
		axios.get(import.meta.env.VITE_API_URL + '/api/v1/tools/scans/' + scan_uuid + '/step_links')
			.then((response) => {
				setStepLinks(response.data.response);
				setStepLinksCount(response.data.count);
			});
	}

	const stepImagesFunct = () => {
		axios.get(import.meta.env.VITE_API_URL + '/api/v1/tools/scans/' + scan_uuid + '/step_images')
			.then((response) => {
				// console.log(response.data);
				setStepImages(response.data.response);
				setStepImagesCount(response.data.count);
			});
	}

	const stepHeadingsFunct = () => {
		axios.get(import.meta.env.VITE_API_URL + '/api/v1/tools/scans/' + scan_uuid + '/step_headings')
			.then((response) => {
				// console.log(response.data);
				setStepHeadings(response.data.response);
				setStepHeadingsCount(response.data.count);
			});
	}

	const stepMetaFunct = () => {
		axios.get(import.meta.env.VITE_API_URL + '/api/v1/tools/scans/' + scan_uuid + '/step_meta')
			.then((response) => {
				// console.log(response.data);
				setStepMeta(response.data.response);
				setStepMetaCount(response.data.count);
			});
	}

	const stepRobotsFunct = () => {
		axios.get(import.meta.env.VITE_API_URL + '/api/v1/tools/scans/' + scan_uuid + '/step_robots')
			.then((response) => {
				// console.log(response.data);
				setStepRobots(response.data.response);
			});
	}

	const stepSitemapFunct = () => {
		axios.get(import.meta.env.VITE_API_URL + '/api/v1/tools/scans/' + scan_uuid + '/step_sitemap')
			.then((response) => {
				// console.log(response.data);
				setStepSitemap(response.data.response);
			});
	}

	const stepOthersFunct = () => {
		axios.get(import.meta.env.VITE_API_URL + '/api/v1/tools/scans/' + scan_uuid + '/step_others')
			.then((response) => {
				// console.log(response.data);
				setStepOthers(response.data.response);
				setStepOthersCount(response.data.count);
			});
	}

	const stepStructuredDataFunct = () => {
		axios.get(import.meta.env.VITE_API_URL + '/api/v1/tools/scans/' + scan_uuid + '/step_structured_data')
			.then((response) => {
				// console.log(response.data);
				setStepStructuredData(response.data.response);
				setStepStructuredDataCount(response.data.count);
				setIsLoading(false);
			});
	}

	return (
		<Layout page="scan" isLoading={isLoading}>
			<div className="main__content">
				{scan ? (
					<>
						<h1>Scan of {scan ? scan.url : ''} done on <time dateTime={(scan ? scan.created_at : '')}>{scan ? scan.created_at : ''}</time></h1>
						<br />

						<Tabs>
							<TabList>
								<Tab>Links ({stepLinksCount})</Tab>
								<Tab>Images ({stepImagesCount})</Tab>
								<Tab>Headings ({stepHeadingsCount})</Tab>
								<Tab>Meta ({stepMetaCount})</Tab>
								<Tab>Robots</Tab>
								<Tab>Sitemap</Tab>
								<Tab>Others ({stepOthersCount})</Tab>
								<Tab>Structured Data ({stepStructuredDataCount})</Tab>
							</TabList>

							<TabPanel>
								<table className="table">
									<thead>
										<tr>
											<th>Href</th>
											<th>Internal text</th>
											<th>Title</th>
											<th>Target</th>
											<th>Rel</th>
											<th>Class</th>
											<th>ID</th>
										</tr>
									</thead>
									{stepLinks &&
										<tbody>
											{stepLinks.map((link, key) => {
												return (
													<tr key={key} className={link.error_class} title={link.title}>
														<td style={{ wordWrap: 'break-word', maxWidth: '400px' }}><a href={link.href} target="_blank" title="Visit the page">{link.href}</a></td>
														<td dangerouslySetInnerHTML={{ __html: link.internal_text }}></td>
														<td>{link.internal_title}</td>
														<td>{link.target}</td>
														<td>{link.rel}</td>
														<td>{link.class}</td>
														<td>{link.id}</td>
													</tr>
												);
											})}

										</tbody>
									}
								</table>
							</TabPanel>

							<TabPanel>
								<table className="table">
									<thead>
										<tr>
											<th>Image</th>
											<th>Data Src</th>
											<th>Alt</th>
											<th>Title</th>
											<th>Height</th>
											<th>Width</th>
											<th>Class</th>
											<th>ID</th>
										</tr>
									</thead>
									{stepImages &&
										<tbody>
											{stepImages.map((link, key) => {
												return (
													<tr key={key} className={link.error_class} title={link.error_title}>
														<td style={{ maxWidth: '300px' }}><a href={link.image} target="_blank"><img src={link.image} /></a></td>
														<td>{link.data_src}</td>
														<td>{link.alt}</td>
														<td>{link.title}</td>
														<td>{link.height}</td>
														<td>{link.width}</td>
														<td>{link.class}</td>
														<td>{link.id}</td>
													</tr>
												);
											})}

										</tbody>
									}
								</table>
							</TabPanel>

							<TabPanel>
								<table className="table">
									<thead>
										<tr>
											<th>Type</th>
											<th>Content</th>
											<th>Class</th>
											<th>ID</th>
										</tr>
									</thead>
									{stepHeadings &&
										<tbody>
											{stepHeadings.map((heading, key) => {
												return (
													<tr key={key}>
														<td>{heading.type}</td>
														<td>{heading.text}</td>
														<td>{heading.class}</td>
														<td>{heading.id}</td>
													</tr>
												);
											})}

										</tbody>
									}
								</table>
							</TabPanel>

							<TabPanel>
								<table className="table">
									<thead>
										<tr>
											<th>Type</th>
											<th>Label</th>
											<th>Content</th>
											<th>ID</th>
										</tr>
									</thead>
									{stepMeta &&
										<tbody>
											{stepMeta.map((meta, key) => {
												return (
													<tr key={key}>
														<td>{meta.type ? meta.type.content : ''}</td>
														<td>{meta.name || meta.property}</td>
														<td><span style={{ color: (meta.content ? meta.content.color : '') }}>{meta.content ? meta.content.content : ''}</span></td>
													</tr>
												);
											})}

										</tbody>
									}
								</table>
							</TabPanel>

							<TabPanel>
								<div dangerouslySetInnerHTML={{ __html: stepRobots }}></div>
							</TabPanel>

							<TabPanel>
								<div dangerouslySetInnerHTML={{ __html: stepSitemap }}></div>
							</TabPanel>

							<TabPanel>
								<table className="table">
									<thead>
										<tr>
											<th>Type</th>
											<th>Value</th>
										</tr>
									</thead>
									{stepOthers &&
										<tbody>
											{stepOthers.map((other, key) => {
												return (
													<tr key={key}>
														<td>{other.type}</td>
														<td><span style={{ color: other.color }}>{other.value}</span></td>
													</tr>
												);
											})}

										</tbody>
									}
								</table>
							</TabPanel>

							<TabPanel>
								<br />
								<div>{stepStructuredData}</div>
							</TabPanel>
						</Tabs>
					</>
				) : (
					<>
						<div>Scan not found</div>
					</>
				)}

			</div>
		</Layout>
	);
}