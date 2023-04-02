import React from 'react';
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../SuperComponents/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../SuperComponents/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../../SuperComponents/c5-SuperSelect/SuperSelect";
import SuperRadio from "../../SuperComponents/c6-SuperRadio/SuperRadio";
import SuperRange from "../../SuperComponents/c7-SuperRange/SuperRange";
import SuperDebouncedInput from "../../SuperComponents/c8-SuperDebouncedInput/SuperDebouncedInput";
import SuperPagination from "../../SuperComponents/c9-SuperPagination/SuperPagination";
import SuperSort from "../../SuperComponents/c10-SuperSort/SuperSort";

export const Test = () => {
    return (
        <>
            <SuperInputText/>
            <SuperButton/>
            <SuperCheckbox/>
            <SuperEditableSpan/>
            <SuperSelect/>
            <SuperRadio/>
            <SuperRange/>
            <SuperDebouncedInput/>
            <SuperPagination itemsCountForPage={5} page={1} onChange={() => {}} totalCount={1} id={''}/>
            <SuperSort onChange={() => {}} sort={'1'} id={''} value={''}/>
        </>
    );
};

