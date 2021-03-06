import React from 'react';
import _ from 'lodash';
import './UserData.scss';

const UserData = ({data}) => {
	const getAnonymousCount = () =>
		data.filter((message) => message.is_anon).length;
		
  	const getUserCount = () =>
		data.filter((message) => !message.is_anon).length;
		
  	const getBotCount = () =>
		data.filter((message) => message.is_bot).length;
		
	const getUniqueCount = () =>
		_.uniqBy(data, 'user').length;

	const geTopCount = () =>
		Object.entries(_.groupBy(data, 'user')).sort((a,b)=> b[1].length - a[1].length).slice(0,10).map(entry => `${entry[0]}: ${entry[1].length}`);
	return (
	<div className="userData">
        <h1>User Data</h1>
        <div># Unique users: {getUniqueCount()}</div>
        <div># top users: {geTopCount()}</div>
        <div># anonymous: {getAnonymousCount()}</div>
        <div># users: {getUserCount()}</div>
        <div># Bots: {getBotCount()}</div>
	</div>
);}

export default UserData;
