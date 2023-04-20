import React, { useEffect, useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { debounce, InputAdornment, TextField } from '@mui/material'

import { useAppDispatch } from '../../../../app/store'
import { useDebounce } from '../../../../common/utils/hooks/useDebounce'
import { packsActions } from '../../packs-slice'
import s from '../SearchPacksBar.module.css'

export const SearchField = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    dispatch(packsActions.setPackName({ packName: debouncedValue }))
  }, [debouncedValue])

  return (
    <div className={s.searchWrapper}>
      <h4>Search</h4>
      <TextField
        className={s.search}
        size="small"
        value={value}
        variant="outlined"
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <ClearIcon onClick={() => setValue('')} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

// export const SearchField = () => {
//   const dispatch = useAppDispatch()
//   const search = (value: string) => {
//     dispatch(packsActions.setPackName({ packName: value }))
//   }
//   const onDebouncedSearch = debounce(search, 3500)
//   const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = event.currentTarget.value
//
//     onDebouncedSearch(newValue)
//   }
//
//   return (
//     <div>
//       <TextField
//         onChange={changeInputHandler}
//         id="outlined-basic"
//         label="Outlined"
//         variant="outlined"
//       />
//     </div>
//   )
// }
