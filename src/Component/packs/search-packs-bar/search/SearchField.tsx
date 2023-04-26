import React, { useEffect, useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '../../../../common/utils/hooks/useDebounce'
import s from '../SearchPacksBar.module.css'

export const SearchField = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState(searchParams.get('packName') || '')
  const debouncedValue = useDebounce(value)

  const changeSearchFieldHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const clearSearchFieldHandler = () => {
    setValue('')
  }

  useEffect(() => {
    const params: { packName?: string } = {}

    if (debouncedValue !== '') {
      ;['page'].forEach(el => searchParams.delete(el))
      params.packName = debouncedValue
      setSearchParams(searchParams)
    } else {
      searchParams.delete('packName')
    }

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...params,
    })
  }, [debouncedValue])

  return (
    <div className={s.searchWrapper}>
      <h4>Search</h4>
      <TextField
        className={s.search}
        size="small"
        value={value}
        variant="outlined"
        onChange={changeSearchFieldHandler}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <ClearIcon onClick={clearSearchFieldHandler} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}
