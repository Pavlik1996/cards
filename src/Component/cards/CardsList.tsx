import { ChangeEvent, useEffect, useState } from 'react'

import { TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { selectAppStatus } from '../../app/app-selectors'
import { useActions } from '../../common/utils/hooks/useActions'
import { useDebounce } from '../../common/utils/hooks/useDebounce'
import SuperPagination from '../../SuperComponents/c9-SuperPagination/SuperPagination'
import { selectUserId } from '../Profile/profile-selector'

import { BackButton } from './BackButton/BackButton'
import { selectorCardsAll } from './cards-selector'
import style from './CardsList.module.css'
import { cardsThunks } from './CardsSlice'
import { sortEnums } from './enums/cards-enums'
import { LearnButton } from './LearnButton/LearnButton'
import { ButtonAddNewCard } from './modalsCards/ButtonAddNewCard/ButtonAddNewCard'
import { TableComponent } from './Table/TableComponent'

export const CardsList = () => {
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(4)
  const [searchCurrentParam, setSearchCurrentParam] = useState('')
  const [sort, setSort] = useState(false)

  const param = useParams()

  const cardsPack_id = param.id

  const searchParam = useDebounce<string>(searchCurrentParam)
  const userId = useSelector(selectUserId)
  const cards = useSelector(selectorCardsAll)
  const status = useSelector(selectAppStatus)

  const { fetchCards } = useActions(cardsThunks)

  const onChangePagination = (newPage: number, newCount: number) => {
    setPage(newPage)
    setPageCount(newCount)
  }

  const searchParamChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchCurrentParam(e.target.value)
  }

  useEffect(() => {
    fetchCards({
      cardsPack_id,
      page,
      pageCount,
      searchParam,
      sort: sort ? sortEnums.up : sortEnums.down,
    })
  }, [page, pageCount, searchParam, sort])

  return (
    <div className={style.wrapper}>
      <BackButton />
      <div>
        {userId === cards.packUserId ? (
          <ButtonAddNewCard sort={sort} cardsPack_id={cardsPack_id} />
        ) : (
          <LearnButton />
        )}
      </div>
      <b className={style.search}>Search</b>
      <TextField
        sx={{ width: '100%' }}
        value={searchCurrentParam}
        onChange={searchParamChangeHandler}
      />
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
          isLoading={status === 'loading'}
          onChange={onChangePagination}
          totalCount={cards.cardsTotalCount}
          itemsCountForPage={pageCount}
        />
      </div>
    </div>
  )
}
