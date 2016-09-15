/**
 * Service interface
 */
export interface ServiceInterface {

    /**
     * Return all
     */
    all();

    /**
     * Paginated resource
     * @param perPage
     * @param page
     */
    paginated(perPage:number, page:number);

    /**
     * Get one by it's ID
     * @param id
     */
    findById(id:number);

    /**
     * Search
     * TODO define the possible options
     * @param term
     */
    search(term:string, options?:{titleOnly:boolean, max:number, perPage:number});

    /**
     * Create new entity
     * @param json
     */
    create(json);

    /**
     * Update an entity
     * @param id
     * @param json
     */
    update(id:number, json);

    /**
     * Delete an entity
     * @param id
     */
    remove(id:number);

}