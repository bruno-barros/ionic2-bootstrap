/**
 * Generic methods that is not specific of a service
 */

/**
 *
 * @param data
 * @param entity
 * @returns {Array}
 */
export function mapCollectionTo(data:any[], entity:any) {

        let mapped:any[] = [];

        if(data.length < 1){
            return data;
        }

        for(var i:number = 0, ttl:number = data.length; i < ttl; i++){
            mapped.push(new entity().deserialize(data[i]));
        }

        return mapped;
}