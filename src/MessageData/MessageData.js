import React from "react";
import _ from "lodash";
import "./MessageData.scss";

const MessageData = ({ data }) => {
  const getAdditions = () =>
    data
      .filter((message) => message.change_size > 0)
      .map((message) => message.change_size)
      .reduce((acc, cur) => acc + cur, 0);

  const getSubtracitons = () =>
    data
      .filter((message) => message.change_size < 0)
      .map((message) => message.change_size)
      .reduce((acc, cur) => acc + cur, 0);

  const getNewPages = () => data.filter((message) => message.is_new).length;

  const getNamespaces = () =>
    Object.entries(_.groupBy(data, "ns"))
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 10)
      .map((entry) => `${entry[0]}: ${entry[1].length}`);

  return (
    <div className="messageData">
      <h1>Messages</h1>
      <div>Messages: {data?.length}</div>
      <div>New pages: {getNewPages()}</div>
      <div>Total Additions: {getAdditions()}</div>
      <div>Total Subtractions: {getSubtracitons()}</div>
      <div>Total: {getAdditions() - getSubtracitons()}</div>
      <div>Namespaces: {getNamespaces()}</div>
    </div>
  );
};

export default MessageData;
