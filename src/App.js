import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Body from './components/Body'
import { Provider } from 'react-redux'
import store from './utils/store'
function App() {
  const [ApiData, setApiData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://run.mocky.io/v3/f47694b8-4d45-4c30-aed0-dd82bb4025fb',
        )
        if (response.ok) {
          const parsedData = await response.json('')
          setApiData(parsedData.data[0])
        } else {
          console.error(`Failed to fetch data. Status: ${response.status}`)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
  // console.log('The apidata is', ApiData.data[0].branch_name)
  // console.log('The apidata is', ApiData)
  const { table_menu_list } = ApiData
  const tableData = table_menu_list
  // console.log('The tables', tableData)
  return (
    <Provider store={store}>
      <Navbar resName={ApiData.restaurant_name} tableData={tableData} />
      <Body tableData={tableData} />
    </Provider>
  )
}

export default App
