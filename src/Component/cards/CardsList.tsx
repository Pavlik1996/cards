import { ChangeEvent, useEffect, useState } from 'react'

import { TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useAppDispatch } from '../../app/store'
import { useDebounce } from '../../common/utils/hooks/useDebounce'
import SuperPagination from '../../SuperComponents/c9-SuperPagination/SuperPagination'
import { selectAuthUserId } from '../auth/auth-selector'

import { BackButton } from './BackButton/BackButton'
import { selectorCardsAll, selectorPackUserId } from './cards-selector'
import style from './CardsList.module.css'
import { cardsThunks } from './CardsSlice'
import { sortEnums } from './enums/cards-enums'
import { LearnButton } from './LearnButton/LearnButton'
import { ButtonAddNewCard } from './modalsCards/ButtonAddNewCard/ButtonAddNewCard'
import { TableComponent } from './Table/TableComponent'

export const CardsList = () => {
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(4)
  const [value, setValue] = useState('')
  const [sort, setSort] = useState(false)
  const param = useParams()

  const searchParam = useDebounce<string>(value)
  const userId = useSelector(selectAuthUserId)
  const packUserId = useSelector(selectorPackUserId)

  const cards = useSelector(selectorCardsAll)

  const cardsPack_id = param.id
  const dispatch = useAppDispatch()

  const onChangePagination = (newPage: number, newCount: number) => {
    setPage(newPage)
    setPageCount(newCount)
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    dispatch(
      cardsThunks.fetchCards({
        cardsPack_id,
        page,
        pageCount,
        searchParam,
        sort: sort ? sortEnums.up : sortEnums.down,
      })
    )
  }, [page, pageCount, searchParam, sort])

  return (
    <div className={style.wrapper}>
      <BackButton dispatch={dispatch} />
      <div>
        {userId === packUserId ? (
          <ButtonAddNewCard dispatch={dispatch} sort={sort} />
        ) : (
          <LearnButton cardsPack_id={cardsPack_id} dispatch={dispatch} />
        )}
      </div>
      <div style={{ textAlign: 'start' }}>Search</div>
      <TextField sx={{ width: '100%' }} value={value} onChange={handleChange} />
      <div className={style.container}>
        <TableComponent
          cards={cards}
          cardsPack_id={cardsPack_id}
          page={page}
          pageCount={pageCount}
          setSort={setSort}
          sort={sort}
        />
        <SuperPagination
          page={page}
          onChange={onChangePagination}
          totalCount={cards.cardsTotalCount}
          itemsCountForPage={pageCount}
        />
      </div>
    </div>
  )
}
