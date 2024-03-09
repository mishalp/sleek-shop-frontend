import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatPrice } from '@/utils/utils'

function Minmax({ minmaxValues, minmax, setFilters, filters }) {

    return (<>
        <div className="flex flex-col gap-1">
            <h4>Min</h4>
            <Select
                value={filters.minmax.min}
                onValueChange={(value) => setFilters(prev => ({ ...prev, minmax: { ...prev.minmax, min: value } }))}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue
                        placeholder={formatPrice(minmaxValues.length > 1 ? minmaxValues[0] : 0)}
                    />
                </SelectTrigger>
                <SelectContent>
                    {minmaxValues.length > 1 ? <>{minmaxValues.filter(val => val < minmax.max).map((item, key) => (
                        <SelectItem key={key} value={item}>{formatPrice(item)}</SelectItem>))}</>
                        :
                        <SelectItem value={0}>{formatPrice(0)}</SelectItem>
                    }
                </SelectContent>
            </Select>
        </div>
        <div className="flex flex-col gap-1">
            <h4>Max</h4>
            <Select
                value={filters.minmax.max}
                onValueChange={(value) => setFilters(prev => ({ ...prev, minmax: { ...prev.minmax, max: value } }))}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue
                        placeholder={formatPrice(minmaxValues.length > 1 ? minmaxValues[minmaxValues.length - 1] : 0)}
                    />
                </SelectTrigger>
                <SelectContent>
                    {minmaxValues.length > 1 ? <>{minmaxValues.filter(val => val > minmax.min).reverse().map((item, key) => (
                        <SelectItem key={key} value={item}>{formatPrice(item)}</SelectItem>))}</>
                        :
                        <SelectItem value={0}>{formatPrice(0)}</SelectItem>
                    }
                </SelectContent>
            </Select>
        </div>
    </>)
}

export default Minmax