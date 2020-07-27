import React from 'react';
import {fetchRssFeedDetails} from '../dal/services';
import ItemsList from './ItemsList';
import PaginationToolBar from  './PaginationToolbar';
import {errorCodeMap} from '../common/constants';
import '../styles/itemList.css';

export interface IRssFeedComponentProps {

}

export interface IRssFeedComponentState{
     rssFeedUrl: string;
     rssFeedData: string[];
     totalRecordsCount: number;
     currentPageNumber: number;
     showList: boolean;
}

class RssFeedComponent extends React.Component<IRssFeedComponentProps, IRssFeedComponentState> {
  
    constructor(props: IRssFeedComponentProps, state: IRssFeedComponentState) {
          super(props);
          this.state = {
                rssFeedUrl: "",
                rssFeedData:[],
                totalRecordsCount: 0,
                currentPageNumber: 1,
                showList: false
          }
    }

    onChange = (evt: any) => {
        const value = evt.target.value;
        this.setState({rssFeedUrl: value});
    }

    onSubmit = async (evt: any) => {
         evt.preventDefault();
         const rssFeedUrl = this.state.rssFeedUrl;
         if(!rssFeedUrl) {
             alert("Enter proper URL:")
         }
         else {
             try{
                 const response = await fetchRssFeedDetails(rssFeedUrl);
                 console.log("Response in clients is:", response);
                 this.setState({rssFeedData: response, totalRecordsCount: response.length, showList: true});
             }
             catch(err) {
                 alert(err)
             }
         }
    }

    onPageChangeEvent = (currentPageNumber: number) => {
          console.log("Current page number is:", currentPageNumber)
          this.setState({currentPageNumber: currentPageNumber});
    }


    render() {
          const {rssFeedData, rssFeedUrl, totalRecordsCount, currentPageNumber, showList} = this.state;
          return (
              <div>
                  <form onSubmit={this.onSubmit}>
                      <fieldset>
                          <label>RSS Feed Url:</label>
                          <br/>
                          <input type="text" value={rssFeedUrl} onChange={this.onChange} className="textarea"/>
                          <br/>
                          <input type="submit"/>
                      </fieldset>
                  </form>
                  { (showList) &&<div>
                    <ItemsList rssFeedData={rssFeedData} currentPageNumber={currentPageNumber}></ItemsList>
                    <PaginationToolBar totalRecordsCount={totalRecordsCount} onPageChangeEvent={this.onPageChangeEvent}></PaginationToolBar>
                   </div> }
              </div>
          )
    }
}

export default RssFeedComponent;