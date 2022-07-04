import MaterialTable from "material-table";
import TableIcons from './TableIcons'


const BidsTable = () => {
    const data = [
        {
            name: 'Omar',
            value: 5000,
            date: 'Fri May 20 2022 16:37:39',
            imageUrl: 'https://avatars.dicebear.com/api/gridy/omar.svg'
        },
        {
          name: 'Cristiano',
          value: 8000,
          date: 'Fri May 20 2022 16:37:39',
          imageUrl: 'https://avatars.dicebear.com/api/gridy/reda.svg'
        },
        {
          name: 'Benzema',
          value: 5000,
          date: 'Fri May 20 2022 16:37:39',
          imageUrl: 'https://avatars.dicebear.com/api/gridy/elsayed.svg'
        },
        {
          name: 'Weeknd',
          value: 22000,
          date: 'Fri May 20 2022 16:37:39',
          imageUrl: 'https://avatars.dicebear.com/api/gridy/mohamed.svg'
        },
        {
          name: 'Omar',
          value: 5000,
          date: 'Fri May 20 2022 16:37:39',
          imageUrl: 'https://avatars.dicebear.com/api/gridy/omar.svg'
      },
      {
        name: 'Cristiano',
        value: 8000,
        date: 'Fri May 20 2022 16:37:39',
        imageUrl: 'https://avatars.dicebear.com/api/gridy/reda.svg'
      },
      {
        name: 'Benzema',
        value: 5000,
        date: 'Fri May 20 2022 16:37:39',
        imageUrl: 'https://avatars.dicebear.com/api/gridy/elsayed.svg'
      },
      {
        name: 'Weeknd',
        value: 22000,
        date: 'Fri May 20 2022 16:37:39',
        imageUrl: 'https://avatars.dicebear.com/api/gridy/mohamed.svg'
      },
      {
        name: 'Omar',
        value: 5000,
        date: 'Fri May 20 2022 16:37:39',
        imageUrl: 'https://avatars.dicebear.com/api/gridy/omar.svg'
    },
    {
      name: 'Cristiano',
      value: 8000,
      date: 'Fri May 20 2022 16:37:39',
      imageUrl: 'https://avatars.dicebear.com/api/gridy/reda.svg'
    },
    {
      name: 'Benzema',
      value: 5000,
      date: 'Fri May 20 2022 16:37:39',
      imageUrl: 'https://avatars.dicebear.com/api/gridy/elsayed.svg'
    },
    {
      name: 'Weeknd',
      value: 22000,
      date: 'Fri May 20 2022 16:37:39',
      imageUrl: 'https://avatars.dicebear.com/api/gridy/mohamed.svg'
    },
    {
      name: 'Omar',
      value: 5000,
      date: 'Fri May 20 2022 16:37:39',
      imageUrl: 'https://avatars.dicebear.com/api/gridy/omar.svg'
    },
    {
      name: 'Cristiano',
      value: 8000,
      date: 'Fri May 20 2022 16:37:39',
      imageUrl: 'https://avatars.dicebear.com/api/gridy/reda.svg'
    },
    {
      name: 'Benzema',
      value: 5000,
      date: 'Fri May 20 2022 16:37:39',
      imageUrl: 'https://avatars.dicebear.com/api/gridy/elsayed.svg'
    },
    {
      name: 'Weeknd',
      value: 22000,
      date: 'Fri May 20 2022 16:37:39',
      imageUrl: 'https://avatars.dicebear.com/api/gridy/mohamed.svg'
    }
    ]
    
    const columns = [
      { title: 'Image', field: 'imageUrl', render: rowData => <img src={rowData.imageUrl} style={{ width: 40, borderRadius: '50%' }} /> },
      { title: 'Name', field: 'name' },
      { title: 'Bid Value', field: 'value' },
      { title: 'Bid Date', field: 'date' },
    ]

    return <div>
        <MaterialTable
         title="Bids"
        icons={TableIcons} 
        columns={columns} 
        data={data} 
        options={
          { pageSize: 10 }
        }
        />
        </div>
  };

export default BidsTable