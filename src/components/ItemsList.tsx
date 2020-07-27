import React from 'react';
import {pageSize} from '../common/constants';
import '../styles/itemList.css';

export interface IItemsListProps {
    rssFeedData: string[];
    currentPageNumber: number;
}
export interface IItemsListState {
    lowIndex: number;
    highIndex: number;
}


class ItemsList extends React.Component<IItemsListProps, IItemsListState> {
    constructor(props: IItemsListProps, state: IItemsListState) {
         super(props);
         this.state = {
                lowIndex: 0,
                highIndex: pageSize - 1
         }
    }

    componentDidUpdate(prevProps: IItemsListProps) {
          if(this.props.currentPageNumber !== prevProps.currentPageNumber) {
                this.computeHighAndLowIndex();
          }
    }

    computeHighAndLowIndex = () => {
          let currentPageNumber = this.props.currentPageNumber;
          let highIndex = currentPageNumber * pageSize - 1;
          let lowIndex = highIndex - pageSize + 1;
          this.setState({lowIndex: lowIndex, highIndex: highIndex});
    }


    render() {
         const {rssFeedData} = this.props;
         const {lowIndex, highIndex} = this.state;
         return (
               <div className="itemscontainer">
                   {rssFeedData.map( (v, index) => {
                           if(index >= lowIndex && index <= highIndex) {
                              return <li key={index}>{v}</li>;
                           } 
                   })}
               </div>
         )
    }
}

export default ItemsList;