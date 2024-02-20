import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useMinmax from '@/hooks/useMinmax'
import { formatPrice } from '@/utils/utils'
import { useEffect, useState } from 'react'

function Minmax({ minmaxValues, minmax, setMinmax }) {


    return (<>
        <div className="flex flex-col gap-1">
            <h4>Min</h4>
            <Select onValueChange={(value) => setMinmax(prev => ({ ...prev, min: value }))}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={formatPrice(minmaxValues[0])} />
                </SelectTrigger>
                <SelectContent>
                    {minmaxValues.filter(val => val < minmax.max).map((item, key) => (
                        <SelectItem key={key} value={item}>{formatPrice(item)}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <div className="flex flex-col gap-1">
            <h4>Max</h4>
            <Select onValueChange={(value) => setMinmax(prev => ({ ...prev, max: value }))}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={formatPrice(minmaxValues[minmaxValues.length - 1])} />
                </SelectTrigger>
                <SelectContent>
                    {minmaxValues.filter(val => val > minmax.min).reverse().map((item, key) => (
                        <SelectItem key={key} value={item}>{formatPrice(item)}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    </>)
}

export default Minmax