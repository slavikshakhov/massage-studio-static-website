import DataContext from './DataContext'
import { useState } from 'react'

function ContextWrapper({children, navigation}) {
    const [value, setValue, selectedIndex, setSelectedIndex] = useState(0)     // any state    
    

    return (
        <DataContext.Provider value={{value, setValue, selectedIndex, setSelectedIndex}}>
            {children}
        </DataContext.Provider>
    )
}

export default ContextWrapper
