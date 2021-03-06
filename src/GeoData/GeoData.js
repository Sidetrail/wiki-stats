import React from 'react';
import _ from 'lodash';
import './GeoData.scss';

const GeoData = ({data =[]}) => {
	const geoData = data.filter(message => message.geo_ip)
	const getGeoData = () => geoData.length

	//TODO extract top 10 table function
	const getTopCountries = () => 
	Object.entries(_.groupBy(geoData.map(i => i.geo_ip), 'country_name')).sort((a,b)=> b[1].length - a[1].length).slice(0,10).map(entry => `${entry[0]}: ${entry[1].length}`);
	const getTopCities = () => 
	Object.entries(_.groupBy(geoData.map(i => i.geo_ip), 'city')).sort((a,b)=> b[1].length - a[1].length).slice(0,10).map(entry => `${entry[0]}: ${entry[1].length}`);
	const getTopRegions = () => 
	Object.entries(_.groupBy(geoData.map(i => i.geo_ip), 'region_name')).sort((a,b)=> b[1].length - a[1].length).slice(0,10).map(entry => `${entry[0]}: ${entry[1].length}`);
	return (
	<div className="geoData">
		<h1>Geo Stuff</h1>
        <div>Number with GeoIp: {getGeoData()}</div>
        <div>Top Countries: {getTopCountries()}</div>
        <div>Top regions: {getTopRegions()}</div>
        <div>Top Cities: {getTopCities()}</div>
		<h2>d3</h2>
	</div>
)}

export default GeoData;
