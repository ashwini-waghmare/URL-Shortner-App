import * as React from 'react';
import FormContainer from '../FormContainer/FormContainer';
import DataTable from '../DataTable/DataTable';
import axios from 'axios';
import { serverUrl } from '../../helpers/constants';
import type { UrlData } from '../../interface/UrlData';


interface IContainerProps {
}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<UrlData[]>([]);

  const fetchData = async () => {
    const response = await axios.get(`${serverUrl}/shortUrl`);
    console.log("The response from the server is ", response);
    setData(response.data.shortUrls);
  };

  React.useEffect(() => {
    fetchData();
  },[]);

  return (
    <>
      <FormContainer />
      <DataTable data={data} />
    </>
  );
};

export default Container;
